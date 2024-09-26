import SvgIcon from '../components/SvgIcon';

// 调用webpack的require.context方法，第一个参数为文件夹路径，第二个参数为是否查询子目录，第三个参数为匹配文件的正则表达式来创建对象，
//包含了该文件夹下所有svg文件
const svgRequired = require.context('./svg', false, /\.svg$/);

svgRequired.keys().forEach((item) => svgRequired(item))

//向app中注册SvgIcon组件，这样就可以在全局使用<svg-icon>标签了
//这个标签的属性icon对应的是svg文件名，比如<svg-icon icon="home" />，会渲染home.svg文件
export default app =>{
  app.component('svg-icon', SvgIcon);
}