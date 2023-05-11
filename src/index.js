const Fs = require('fs')
const Https = require('https')
const Path = require('path')
const Url = require('url')
const Chalk = require('chalk')
const Figures = require('figures')
const Ora = require('Ora')

const glob = require('glob')
const path = require('path')
const tinify = require('tinify')
const { ByteSize, RandomNum, RoundNum } = require('trample/node')

tinify.key = 'NyKH05dzNk5tb4m6rzdFXXpTsjpgf6q7'

//  获取需要压缩image的图片目录路径
const imgs = path.join(path.dirname(__filename), 'images')
let i = 0
let total = 0

//  写个递归 遍历压缩图片
const process = async (list) => {
    let fileName = list.shift()
    console.log(fileName)
    //    核心代码 通过tinify 压缩图片
    const source = tinify.fromFile(fileName)
    await source.toFile(fileName)

    //    打印进度
    console.log(i++, total, fileName)

    if (list.length > 0) {
        await process(list)
    }
}

//  获取目标路径下的所有 .jpg 和 .png图片
glob(`${imgs}/**/*.{jpg,png}`, {}, async (err, res) => {
    total = res.length
    await process(res)
})
