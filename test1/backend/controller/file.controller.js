const https = require('https');
const fs = require('fs');

class FileController {

    async getFile(req, res) {
        try {
            const url = req.query.url;
            const fileName = url.split('/').slice(-1)[0];
            https.get(url, (response) => {
                const file = fs.createWriteStream(fileName);
                response.pipe(file);
                file.on("finish", () => {
                    file.close();
                    console.log("Download Completed");
                    res.download(`./${fileName}`, fileName)
                });
                res.on("finish", () => {
                    fs.rm(fileName, (err) => {
                        if (err) {
                            throw err;
                        }
                    })
                })
            })
      
        } catch (e) {
            console.log(e);
            res.status(500).json({message: 'Download error'});
        }
     }
}

module.exports = new FileController();