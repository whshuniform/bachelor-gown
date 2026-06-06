/*
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2020-12-12 19:04:20
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2026-03-01 20:31:50
 * @FilePath: /BachelorGown/BachelorGown/middleware/authorizedPath.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export default function ({
  route,
  params,
  query,
  redirect
}) {
  console.log('route', route);
  
  if (route.name === "class") {
    const _class = parseInt(params.class)

    if (_class < 21 || _class > 31 || /^\+?(0|[1-9]\d*)$/.test(params.class) === false) {
      return redirect('/')
    }
  }
}
