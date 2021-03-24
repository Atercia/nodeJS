const fs = require('fs');
const output = fs.createWriteStream('./stdout.txt');
const errorOutput = fs.createWriteStream('./stderr.txt');
const { Logger } = require('./logger');

const logger = Logger(output, errorOutput);

logger.info('hello world!'); // 内容输出到 stdout.txt 文件
logger.error('错误日志记录'); // 内容输出到 stderr.txt 文件