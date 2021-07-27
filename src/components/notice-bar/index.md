# NoticeBar 通告栏

<code src="./demos/index.tsx" />

# API

| 属性      | 说明                             | 类型                           | 默认值              |
| --------- | -------------------------------- | ------------------------------ | ------------------- |
| type      | 通告栏的类型                     | 'default' \| 'error' \| 'info' | 'default'           |
| delay     | 开始滚动的延迟，单位 ms          | number                         | 2000                |
| speed     | 滚动速度，单位 px/s              | number                         | 50                  |
| content   | 公告内容                         | React.ReactNode                | -                   |
| closeable | 是否可关闭                       | boolean                        | false               |
| onClose   | 关闭时的回调                     | () => void                     | -                   |
| extra     | 额外操作区域，显示在关闭按钮左侧 | React.ReactNode                | -                   |
| icon      | 左侧广播图标                     | React.ReactNode                | \<SoundOutlined \/> |
