# List 列表

<code src="./demos/demo1.tsx" />

## API

### List

| 属性 | 说明                   | 类型                | 默认值    |
| ---- | ---------------------- | ------------------- | --------- |
| mode | 支持默认和卡片两种模式 | 'default' \| 'card' | 'default' |

### List.Item

| 属性        | 说明                                                          | 类型      | 默认值                                               |
| ----------- | ------------------------------------------------------------- | --------- | ---------------------------------------------------- |
| title       | 列表中间上部的标题区域                                        | ReactNode | -                                                    |
| children    | 列表中间的主内容区域                                          | ReactNode | -                                                    |
| description | 列表中间下部的描述区域                                        | ReactNode | -                                                    |
| prefix      | 列表项左侧区域                                                | ReactNode | -                                                    |
| extra       | 列表项右侧区域                                                | ReactNode | -                                                    |
| showArrow   | 右侧是否显示箭头图标                                          | boolean   | 当 onClick 属性存在时，默认为 true，否则默认为 false |
| onClick     | 列表项的点击事件，当设置了 onClick 属性时，列表项会有点击效果 | boolean   | -                                                    |
