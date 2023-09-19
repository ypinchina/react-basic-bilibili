import { Card, Button, Form, Input, Checkbox } from "antd"
import logo from '@/assets/logo.png'
import './index.scss'

function Login () {
  const onFinish = (values) => {
    console.log('Success:', values)
  }
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }
  return (
    <div className="login">
      <Card className="login-container">
        <img className="login-logo" src={logo} alt=""></img>
        <Form onFinish={onFinish}
          onFinishFailed={onFinishFailed} validateTrigger={['onBlur', 'onChange']} initialValues={{
            remember: true,
          }}>
          <Form.Item name="username"
            rules={[
              {
                required: true,
                message: '请输入手机号',
              },
              {
                pattern: /^1[3-9]\d{9}$/, message: '手机号格式不对', validateTrigger: 'onBlur'
              }
            ]}>
            <Input size="large" placeholder="请输入手机号" />
          </Form.Item>
          <Form.Item name="password"
            rules={[
              {
                required: true,
                message: '请输入验证码',
              }, {
                len: 6, message: '验证码为6位', validateTrigger: 'onBlur'
              }
            ]}>
            <Input size="large" placeholder="请输入验证码" />
          </Form.Item>
          <Form.Item name="remember"
            valuePropName="checked">
            <Checkbox className="login-checkbox-label">
              我已阅读并同意「用户协议」和「隐私条款」
            </Checkbox>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" size="large" block>
              登录
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default Login