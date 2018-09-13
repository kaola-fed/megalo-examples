const mockConfig = require('../../mock.config');

const fs = require('fs-extra');
const path = require('path');
const stripJsonComments = require('strip-json-comments');
const chalk = require('chalk');
const log = console.log;


const getMockData = (requestPath, method) => {
    const hostKey = Object.keys(mockConfig).find((key) => {
        return requestPath.match(mockConfig[key].proxyRegExps);
    });

    const { asyncMockPath } = mockConfig[hostKey];
    const mockPath = path.join(asyncMockPath, method, requestPath);
    const jsonPath = `${mockPath}.json`;
    const jsPath = `${mockPath}.js`;
    const jsExists = fs.existsSync(jsPath);
    const jsonExists = fs.existsSync(jsonPath);
    const isExists = jsExists || jsonExists;
    if(!isExists) {
        log(chalk.blue(`${mockPath}.js{on} doesn't exists. Mock file will be generated.`));
        fs.ensureFileSync(jsonPath);
        fs.writeJsonSync(jsonPath, {
            "code": 200,
            "message": null,
            "data": {}
        });
    }

    jsExists ? delete require.cache[require.resolve(jsPath)] : delete require.cache[require.resolve(jsonPath)];
    return require(jsExists ? jsPath : jsonPath);
};

const isApi = (requestPath) => {
    return Object.keys(mockConfig).some((key) => {
        return requestPath.match(mockConfig[key].proxyRegExps);
    });
}
module.exports = (req, res, next) => {
    const requestPath = req.path;
    if (isApi(requestPath)) {
        const method = req.method.toLowerCase();
        const data = getMockData(requestPath, method);
        if (data) {
            res.status(200).json(typeof data === "string" ? JSON.parse(stripJsonComments(data)) : data);
        } else {
            log(chalk.blue(`The json file seems empty.`));
            res.status(404).json({
                code: 404,
                msg: '接口数据未定义'
            });
        }
    } else {
        next();
    }
};