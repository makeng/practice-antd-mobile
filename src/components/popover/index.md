# Popover 气泡弹出框

<code src="./demos/index.tsx" />

# API

### Popover

| 属性            | 说明                                                                                                                                           | 类型                                      | 默认值              |
| --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------- | ------------------- |
| children        | 触发 popover 的元素                                                                                                                            | React.ReactNode                           | -                   |
| placement       | 气泡框位置，可选 `top` `left` `right` `bottom` `topLeft` `topRight` `bottomLeft` `bottomRight` `leftTop` `leftBottom` `rightTop` `rightBottom` | string                                    | 'top'               |
| defaultVisible  | 默认是否显隐                                                                                                                                   | boolean                                   | false               |
| visible         | 受控模式下，是否展示弹出内容                                                                                                                   | boolean                                   | -                   |
| onVisibleChange | 显示隐藏的回调                                                                                                                                 | (visible: boolean) => void                | -                   |
| getContainer    | 浮层渲染父节点，默认渲染到 body 上                                                                                                             | (triggerNode: HTMLElement) => HTMLElement | () => document.body |
| destroyOnHide   | 隐藏时，是否销毁 tooltip 内容                                                                                                                  | boolean                                   | false               |
| content         | 弹出内容                                                                                                                                       | React.ReactNode                           | -                   |
| mode            | 设置亮色模式或者黑色模式                                                                                                                       | `light` \| `dark`                         | `light`             |

### Popover.Menu

除 content 外，其余全部属性继承自 Popover，特有属性如下：

| 属性     | 说明                                 | 类型                   | 默认值 |
| -------- | ------------------------------------ | ---------------------- | ------ |
| actions  | 菜单列表，当弹出内容为标准菜单时使用 | Action[]               | -      |
| onSelect | 当使用菜单列表时，选中菜单的回调     | (item: Action) => void | -      |

#### Action

| 属性     | 说明                                 | 类型             | 默认值  |
| -------- | ------------------------------------ | ---------------- | ------- |
| text     | 菜单列表，当弹出内容为标准菜单时使用 | ReactNode        | -       |
| icon     | 当使用菜单列表时，选中菜单的回调     | ReactNode        | null    |
| key      | 菜单的唯一标识, 缺省时即为 index     | string \| number | `index` |
| disabled | 是否禁用                             | boolean          | false   |

### Ref

| 属性    | 说明                       | 类型       |
| ------- | -------------------------- | ---------- |
| show    | 展示气泡弹出框             | () => void |
| hide    | 隐藏气泡弹出框             | () => void |
| visible | 气泡弹出框当前是否正在展示 | boolean    |
