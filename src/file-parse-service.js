const xlsx = require('node-xlsx');
const fs = require('fs');

const { model } = require('./mongo-service');

module.export = class FileParse {
  constructor(fileType, filePathName, isHead, head) {
    this.fileType = fileType;
    this.filePathName = filePathName;
    this.isHead = isHead;
    this.head = head;
  }

  async execute() {
    console.log('read file ...');
    const data = await this.getFileData();
    console.log('convert data ...');
    const convertedData = await this.convertData(data);
    console.log('save in mongo ...');
    await model.create(convertedData);
    console.log('finish');
  }

  async getFileData() {
    if (this.fileType === 1) {
      return fs.readFileSync(this.filePathName).toString().split('\n').map(i => i.split(','));
    } else if (this.fileType === 2) {
      return xlsx.parse(this.filePathName)[0].data;
    } else {
      throw new Error('The file type is not csv or excel');
    }
  }

  convertData(data) {
    var convertedData = [];
    if(this.isHead) {
      var head = data[0];
      data.splice(0, 1);
    } else {
      var head = this.head;
    }
    data.map(i => {
      var json = {};
      head.forEach((j, jndex) => {
          json[j] = i[jndex]
      })
      convertedData.push(json)
    });
    return convertedData;
  }
}
