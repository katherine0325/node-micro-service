const { send } = require('micro');

const { FileParse } = require('./file-parse-service');

module.exports = async (req, res) => {
  try {
    if (!req.query.fileType) {
      throw new Error('Missing the input argument fileType');
    }
    if (!req.query.filePathName) {
      throw new Error('Missing the input argument filePathName');
    }
    if (!req.query.containHead) {
      throw new Error('Missing the input argument containHead');
    }
    const fileParse = new FileParse(
      req.query.fileType,
      req.query.filePathName,
      req.query.containHead === 'Y'? true : false,
      req.query.headString.split(','),
    );
    await fileParse.execute();
    send(res, 200, 'Successfully');
  } catch (err) {
    send(res, 500, err.message);
  }
}
