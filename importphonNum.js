// code that you can import number that you allready have and you dont want to 
// import and but rest of numbers you want to import that you have made here 

// *********************

async import2(importUserDto: DncCSVDto, files, user: User, tenantId) {
  let { type, team, campaign } = importUserDto;
  var count = 0;
  const unsuccessRecord = new Array();
  const csv = require('csvtojson');
  const array = await csv().fromFile('./' + files[0].path);

  if (!array.length && array.length > 0) {
    throw new BadRequestException("Invalid or empty input array");
  }
  if (array[0]["phone_number"] === undefined) {
    throw new BadRequestException("Please fill in all the necessary fields and try again");
  }

  let successInp = [];
  let phoneNumbers = array.map((o) => o.phone_number);
  let totalDocCount = phoneNumbers.length;

  for (let index = 0; index < array.length; index++) {
    var row = array[index];

    if (row && row.phone_number) {
      let duplicate = await this.DncModel.findOne({
        phone_number: row.phone_number,
        isDeleted: false,
      });

      if (duplicate) {
        unsuccessRecord.push(row.phone_number);
      } else {
        let obj: DNC = {};
        let userId: any = user._id;

        obj._id = uuidv4();
        obj.isDeleted = false;
        obj.phone_number = row.phone_number;
        obj.type = type;
        obj.team = team;
        obj.campaign = campaign;
        obj.create_at = new Date();
        obj.createdBy = userId;
        obj.tags = await this.getTags([], this.serviceCollectionName, [obj._id]);

        successInp.push(obj);
      }
    }
  }

  let newModels = null;
  let successCount = 0;

  if (successInp.length > 0) {
    newModels = await this.DncModel.insertMany(successInp);
    successCount = newModels.length;
  }

  let activityLog = new ActivityLogInterface();
  activityLog.Opration = 'Import';
  activityLog.action = 'save';
  activityLog.current = successInp;
  activityLog.moduleName = this.ModuleName;
  activityLog.note = 'CSV file imported';
  activityLog.userId = user._id;
  activityLog.user_name = user.name || user.email;

  Activity.InternalActivity(tenantId, activityLog);

  let taskId = uuidv4();
  let path = `/otherfiles/`;
  let obj: any = {
    tenantId,
    fileName: files[0]?.filename,
    reqTime: new Date(),
    processLog: {
      importCount: successCount,
      unsuccessRecord: unsuccessRecord,
      output: newModels,
      totalDocCount,
    },
    req: importUserDto,
    taskId: '',
    fileurl: assetsUrl + path + files[0]?.filename,
    csvfileName: files[0]?.filename,
    user: user,
    totalDocCount,
  };

  await this.filestatus(
    taskId,
    taskId,
    obj,
    ImportModuleNameEnum.dnc,
    ImportSubTypesEnum.Import,
    'done',
    tenantId,
  );

  return {
    message: `DNC-Number added successfully.`,
    importCount: successCount,
    unsuccessRecord: unsuccessRecord,
    acknowledged: newModels?.length > 0,
    insertedCount: successCount,
  };
}
// ********************* this is add

async add3(dto: AddDncDto, loginUser: User, tenantId) {
  let { phone_number, type, team, tags, campaign } = dto;

  let userId: any = loginUser._id;

  if (type == 'team') {
    await this.checkTeamAuthority(loginUser, team);
  }

  if (type == 'campaign') {
    let teamId = await RadisOp.client.hget(
      `Tenant:${tenantId}:Campaign:${campaign}`,
      'team',
    );

    await this.checkTeamAuthority(loginUser, teamId);
  }

  let duplicate = await this.DncModel.findOne({ 
    phone_number: phone_number,
    isDeleted: false,
  });

  if (duplicate) {
    throw new BadRequestException("Duplicate found!");
  }

  let obj: DNC = {};

  obj._id = uuidv4();
  obj.isDeleted = false;
  obj.phone_number = phone_number;
  obj.type = type;
  obj.team = team;
  obj.campaign = campaign;
  obj.create_at = new Date();
  obj.createdBy = userId;
  obj.tags = await this.getTags(tags, this.serviceCollectionName, [obj._id]);

  let newModel = null;
  let successCount = 0;

  newModel = await this.DncModel.insertOne(obj);
  successCount = newModel.insertedCount;

  if (team) {
    await RadisOp.client.sadd(`Tenant:${tenantId}:DNC:team:${team}`, phone_number);
  }

  if (campaign) {
    await RadisOp.client.sadd(`Tenant:${tenantId}:DNC:campaign:${campaign}`, phone_number);
  }

  if (obj.type == 'global') {
    await RadisOp.client.sadd(`Tenant:${tenantId}:DNC:global`, phone_number);
  }

  let activityLog = new ActivityLogInterface();
  // activityLog.Operation = 'Create';
  activityLog.action = 'save';
  activityLog.current = [obj];
  activityLog.moduleName = this.ModuleName;
  activityLog.note = 'Object updated';
  activityLog.userId = userId;
  activityLog.user_name = loginUser.name || loginUser.email;

  Activity.InternalActivity(tenantId, activityLog);

  return {
    message: `DNC added successfully.`,
    success: newModel ? newModel.insertedId : null,
    conflict: duplicate ? [duplicate.phone_number] : [],
    successCount: successCount,
    unsuccessRecord: duplicate ? [phone_number] : [],
    successInp: [phone_number]
  };
}
