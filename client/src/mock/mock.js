import Mock, { Random } from 'mockjs'

// 通过Mock.mock来模拟后端API接口
// 注：|后面为mock语法, url可以使用正则表达式
Mock.mock('/api/goodslist', 'get', {
  status: '200',
  message: '获取商品列表成功',
  // 'data|5-10'随机生成5-10条数据
  'data|5-10': [{
    // 使用随机函数生成数据,其他函数具体参照mock官方文档
    // id: '@increment(1)',   // 自增id值
    'id|+1': 0,
    name: '@cword(2, 8)',  //  随机生成2-8的汉字
    price: '@natural(2, 10)',  //  生成2-10的自然数
    count: '@natural(100, 1000)',  //  生成100-1000的自然数
    img: '@dataImage(78x78)'  //  生成78x78尺寸的图片
  }]
})

// 模拟post请求
Mock.mock('/api/addgoods', 'post', (option) =>{
  // option为post请求的相关参数
  console.log(option);
  // return {
  //   status: 200,
  //   message: '商品添加成功'
  // }
  return Mock.mock({
    status: 200,
    message: '@cword(2, 10)'
  })
})

// 创建自定义mock函数
// 需要先从mockjs引入Random
Random.extend({
  // 自定义函数名：自定义函数
  fruit: () => {
    const arr = ['橘子', '香蕉', '梨子', '菠萝'];
    return this.pick(arr);
  }
})

// 模拟url携带参数请求
// 使用正则表达式'/\/api\/getgoods/'来描述url
Mock.mock(/\/api\/getgoods/, 'get', (option) => {
  console.log(option);
  // 通过正则.exec函数从字符串中提取需要的数据
  const res = /\/api\/getgoods\/(d+)/.exec(option.url);
  return Mock.mock({
    data: {
      id: res[1] - 0,
      name: '@fruit()',  //  使用自定义函数生成名称
      price: '@natural(2, 10)',  //  生成2-10的自然数
      count: '@natural(100, 1000)',  //  生成100-1000的自然数
      img: '@dataImage(78x78)'  //  生成78x78尺寸的图片
    },
    status: 200,
    message: '获取商品成功'
  })
})

//补充： 可以拆分mock成多个mock模块，通过import引入