### Overview
This is a program that receive a excel file path and load the data in the mongo database.


### How to call the micro service
```javascript
{
    url: 'http://localhost:3000',
    method: 'GET',
    data: {
        fileType: 'excel',  // you can fill csv or excel
        filePathName: './test/file_name.txt',  // the file path name what you want to load in database
        containHead: 'Y',  // if the file has head, please fill Y but N
        headString: 'name,email,url',  // if the file has no head(containHead=N), you can provide a head for it.
    }
}
```


### How to start the program
```
npm run start
```
