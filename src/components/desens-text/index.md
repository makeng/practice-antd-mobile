# DesensText 脱敏

<code src="./demos/index.tsx" />

# API

| 属性          | 说明           | 类型                      | 默认值 |
| ------------- | -------------- | ------------------------- | ------ |
| text          | 未脱敏的内容   | ReactNode                 | --     |
| desensText    | 脱敏后的内容   | ReactNode                 | --     |
| desens        | 脱敏状态       | boolean                   | --     |
| defaultDesens | 默认脱敏状态   | boolean                   | true   |
| onChange      | 切换脱敏的回调 | (desens: boolean) => void | --     |
