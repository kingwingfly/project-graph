# 逻辑节点

当文本内容为特定的格式时，就会变成逻辑节点，例如 `#ADD#`

逻辑节点可以看成一个**函数**，一个有若干个输入值和若干个输出值的函数。

输入值的顺序由节点摆放的x坐标位置，即从左到右排布。输出值的顺序由节点的输出端口位置，即从上到下排布。

例如 `#ADD#` 节点会执行加法运算。它输入无穷多个参数，输出一个值。

按住 x 键时，所有逻辑节点就会以屏幕刷新率的速度不停的执行。松开 x 键时，所有逻辑节点就会停止执行。

<center>
<svg xmlns="http://www.w3.org/2000/svg" width="205.28272267699867" height="297.47410376385596" viewBox="5568.973032631503 -3118.505267408721 205.28272267699867 297.47410376385596" style="background-color:rgba(31, 31, 31, 1)"><rect x="5598.973032631503" y="-3088.505267408721" width="47.519989013671875" height="60" rx="8" ry="8" fill="rgba(0, 0, 0, 0)" stroke="rgba(204, 204, 204, 1)" stroke-width="2"></rect><text x="5622.733027138339" y="-3044.505267408721" fill="rgba(204, 204, 204, 1)" font-size="32" text-anchor="middle" font-family="MiSans">5</text><rect x="5696.57576263272" y="-3086.5084800877767" width="47.67999267578125" height="60" rx="8" ry="8" fill="rgba(0, 0, 0, 0)" stroke="rgba(204, 204, 204, 1)" stroke-width="2"></rect><text x="5720.415758970611" y="-3042.5084800877767" fill="rgba(204, 204, 204, 1)" font-size="32" text-anchor="middle" font-family="MiSans">6</text><rect x="5599.119252985801" y="-3002.381726281242" width="143.8399658203125" height="60" rx="8" ry="8" fill="rgba(0, 0, 0, 0)" stroke="rgba(204, 204, 204, 1)" stroke-width="2"></rect><text x="5671.039235895957" y="-2958.381726281242" fill="rgba(204, 204, 204, 1)" font-size="32" text-anchor="middle" font-family="MiSans">#ADD#</text><rect x="5644.190722829665" y="-2911.031163644865" width="54.879974365234375" height="60" rx="8" ry="8" fill="rgba(0, 0, 0, 0)" stroke="rgba(204, 204, 204, 1)" stroke-width="2"></rect><text x="5671.630710012282" y="-2867.031163644865" fill="rgba(204, 204, 204, 1)" font-size="32" text-anchor="middle" font-family="MiSans">11</text><line x1="5639.559858034476" y1="-3028.505267408721" x2="5654.21240499982" y2="-3002.381726281242" stroke="rgba(204, 204, 204, 1)" stroke-width="2"></line><polygon points="5654.21240499982,-3002.381726281242 5650.510509495821,-3016.917749453949 5650.543426944478,-3008.9230258485622 5643.738457864848,-3013.119343866806" fill="rgba(204, 204, 204, 1)" stroke="rgba(204, 204, 204, 1)"></polygon><line x1="5702.807856309275" y1="-3026.5084800877767" x2="5688.647138557293" y2="-3002.381726281242" stroke="rgba(204, 204, 204, 1)" stroke-width="2"></line><polygon points="5688.647138557293,-3002.381726281242 5699.329359014567,-3012.9121662579096 5692.443515658555,-3008.8499192982304 5692.632992853784,-3016.8424650427005" fill="rgba(204, 204, 204, 1)" stroke="rgba(204, 204, 204, 1)"></polygon><line x1="5671.2334790727655" y1="-2942.381726281242" x2="5671.436466835474" y2="-2911.031163644865" stroke="rgba(204, 204, 204, 1)" stroke-width="2"></line><polygon points="5671.436466835474,-2911.031163644865 5675.2248608525,-2925.54488373214 5671.387907059139,-2918.531006439759 5667.460452250126,-2925.4946109523744" fill="rgba(204, 204, 204, 1)" stroke="rgba(204, 204, 204, 1)"></polygon></svg>
</center>

以上是一个加法的例子

<center>
<svg xmlns="http://www.w3.org/2000/svg" width="205.28272267699867" height="297.47410376385596" viewBox="5568.973032631503 -3118.505267408721 205.28272267699867 297.47410376385596" style="background-color:rgba(31, 31, 31, 1)"><rect x="5598.973032631503" y="-3088.505267408721" width="47.519989013671875" height="60" rx="8" ry="8" fill="rgba(0, 0, 0, 0)" stroke="rgba(204, 204, 204, 1)" stroke-width="2"></rect><text x="5622.733027138339" y="-3044.505267408721" fill="rgba(204, 204, 204, 1)" font-size="32" text-anchor="middle" font-family="MiSans">5</text><rect x="5696.57576263272" y="-3086.5084800877767" width="47.67999267578125" height="60" rx="8" ry="8" fill="rgba(0, 0, 0, 0)" stroke="rgba(204, 204, 204, 1)" stroke-width="2"></rect><text x="5720.415758970611" y="-3042.5084800877767" fill="rgba(204, 204, 204, 1)" font-size="32" text-anchor="middle" font-family="MiSans">6</text><rect x="5599.119252985801" y="-3002.381726281242" width="143.8399658203125" height="60" rx="8" ry="8" fill="rgba(0, 0, 0, 0)" stroke="rgba(204, 204, 204, 1)" stroke-width="2"></rect><text x="5671.039235895957" y="-2958.381726281242" fill="rgba(204, 204, 204, 1)" font-size="32" text-anchor="middle" font-family="MiSans">#ADD#</text><rect x="5644.190722829665" y="-2911.031163644865" width="54.879974365234375" height="60" rx="8" ry="8" fill="rgba(0, 0, 0, 0)" stroke="rgba(204, 204, 204, 1)" stroke-width="2"></rect><text x="5671.630710012282" y="-2867.031163644865" fill="rgba(204, 204, 204, 1)" font-size="32" text-anchor="middle" font-family="MiSans">11</text><line x1="5639.559858034476" y1="-3028.505267408721" x2="5654.21240499982" y2="-3002.381726281242" stroke="rgba(204, 204, 204, 1)" stroke-width="2"></line><polygon points="5654.21240499982,-3002.381726281242 5650.510509495821,-3016.917749453949 5650.543426944478,-3008.9230258485622 5643.738457864848,-3013.119343866806" fill="rgba(204, 204, 204, 1)" stroke="rgba(204, 204, 204, 1)"></polygon><line x1="5702.807856309275" y1="-3026.5084800877767" x2="5688.647138557293" y2="-3002.381726281242" stroke="rgba(204, 204, 204, 1)" stroke-width="2"></line><polygon points="5688.647138557293,-3002.381726281242 5699.329359014567,-3012.9121662579096 5692.443515658555,-3008.8499192982304 5692.632992853784,-3016.8424650427005" fill="rgba(204, 204, 204, 1)" stroke="rgba(204, 204, 204, 1)"></polygon><line x1="5671.2334790727655" y1="-2942.381726281242" x2="5671.436466835474" y2="-2911.031163644865" stroke="rgba(204, 204, 204, 1)" stroke-width="2"></line><polygon points="5671.436466835474,-2911.031163644865 5675.2248608525,-2925.54488373214 5671.387907059139,-2918.531006439759 5667.460452250126,-2925.4946109523744" fill="rgba(204, 204, 204, 1)" stroke="rgba(204, 204, 204, 1)"></polygon></svg>
</center>

以上是一个减法的例子

## 节点类型及功能

### 1. 基本功能

- `#TEST#`: 将文本重命名为 "Hello World!!"

### 2. 数学运算

- `#ADD#`: 计算所有父节点文本转换为数字的和。
- `#SUB#`: 计算前两个父节点文本转换为数字的差。
- `#MUL#`: 计算所有父节点文本转换为数字的乘积。
- `#DIV#`: 计算前两个父节点文本转换为数字的商。
- `#MOD#`: 计算前两个父节点文本转换为数字的余数。
- `#ABS#`: 计算单个父节点文本转换为数字的绝对值。
- `#MAX#`: 计算所有父节点文本转换为数字的最大值。
- `#MIN#`: 计算所有父节点文本转换为数字的最小值。

### 3. 逻辑运算

- `#AND#`: 计算所有父节点文本转换为数字的与运算。
- `#OR#`: 计算所有父节点文本转换为数字的或运算。
- `#NOT#`: 如果有一个父节点，计算其逻辑非值（0 变 1，非 0 变 0）。

### 4. 字符串操作

- `#UPPER#`: 将单个父节点文本转换为大写。
- `#LOWER#`: 将单个父节点文本转换为小写。
- `#LEN#`: 计算单个父节点文本的长度。
- `#COPY#`: 复制单个父节点的文本。
- `#SPLIT#`: 根据第二个父节点文本作为分隔符，对第一个父节点文本进行分割，返回多个结果。
- `#REPLACE#`: 将第一个父节点的文本中替换掉第二个父节点文本为第三个父节点的文本。
- `#CONNECT#`: 将所有父节点文本连接成一个字符串。

### 5. 随机与四舍五入

- `#RANDOM#`: 生成一个随机数。
- `#FLOOR#`: 将单个父节点文本转换为数字后取整（向下取整）。
- `#CEIL#`: 将单个父节点文本转换为数字后取整（向上取整）。

### 6. 计数

- `#COUNT#`: 返回所有父节点的数量。

## 使用流程

1. 创建所需功能的节点（如 `#ADD#`， `#SUB#` 等）。
2. 确保每个逻辑节点都有正确的父节点输入。
3. 运行自动计算引擎，输出结果将在相关子节点中显示。

## 注意事项

- 在进行数学运算时，确保输入可以正确转换为数字。
- 特定节点功能如 `#SPLIT#` 和 `#REPLACE#` 需要满足父节点的数量要求。
- 使用时，确保节点的逻辑关系正确，以避免计算错误。
