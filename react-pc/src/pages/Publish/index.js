import {
  Card,
  Breadcrumb,
  Form,
  Button,
  Radio,
  Input,
  Upload,
  Space,
  Select,
  message
} from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import ReactQuill from 'react-quill'
import useStore from '@/store'
import { observer } from 'mobx-react-lite'
import 'react-quill/dist/quill.snow.css'
import './index.scss'
import { useState, useRef, useEffect } from 'react'
import { http } from '@/utils'
import { useNavigate, useSearchParams } from 'react-router-dom'

const { Option } = Select

const Publish = () => {
  const { channelStore } = useStore()
  const [fileList, setFileList] = useState([])

  const [imgCoverType, setImgCoverType] = useState(1)
  const navigate = useNavigate()
  const coverRef = useRef([])
  const onUploadChange = ({ fileList }) => {
    const formatList = fileList.map(item => {
      if (item.status === 'done') {
        // 上传完毕
        return { 'url': item.response.data.url }
      } else {
        return item
      }
    })
    setFileList(formatList)
    coverRef.current = formatList
  }
  const [params] = useSearchParams()
  const articleId = params.get('id')

  const changeImgCoverType = (e) => {
    const countVal = e.target.value
    setImgCoverType(countVal)
    if (coverRef.current.length) {
      // 当选择单图或者三图  而没有选择无图时。 不然切换无图和有图会报错BUG
      countVal === 1 ? setFileList([coverRef.current[0]]) : setFileList(coverRef.current)
    }
  }

  const form = useRef(null)
  useEffect(() => {
    const getArticleInfo = async () => {
      const res = await http.get(`/mp/articles/${articleId}`)
      if (res.message === 'OK') {
        const data = res.data
        form.current.setFieldsValue({ ...data, type: data.cover.type })
        const temFileList = data.cover.images.map(item => ({ url: item }))
        setFileList(temFileList)
        coverRef.current = temFileList
      }
    }
    if (articleId) {
      getArticleInfo()
    }
  }, [articleId])
  const submitForm = async (values) => {
    const { channel_id, content, title, type } = values
    const params = {
      channel_id,
      content,
      title,
      type,
      cover: {
        type: type,
        images: fileList.map(item => item.url)
      }
    }
    let res = null
    if (articleId) {
      // 编辑
      res = await http.put(`/mp/articles/${articleId}?draft=false`, params)
    } else {
      res = await http.post('/mp/articles?draft=false', params)
    }
    if (res.message === 'OK') {
      message.success(articleId ? '编辑成功' : '新增成功')
      navigate('/article')
    }
  }
  return (
    <div className="publish">
      <Card
        title={
          <Breadcrumb separator=">" items={[{ title: '首页', href: "/" }, { title: `${articleId ? '编辑' : '发布'}文章` }]} />
        }
      >
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ type: 1, content: '' }}
          onFinish={submitForm}
          ref={form}
        >
          <Form.Item
            label="标题"
            name="title"
            rules={[{ required: true, message: '请输入文章标题' }]}
          >
            <Input placeholder="请输入文章标题" style={{ width: 400 }} />
          </Form.Item>
          <Form.Item
            label="频道"
            name="channel_id"
            rules={[{ required: true, message: '请选择文章频道' }]}
          >
            <Select placeholder="请选择文章频道" style={{ width: 400 }}>
              {channelStore.channelList.map(channel => <Option key={channel.id} value={channel.id}>{channel.name}</Option>)}
            </Select>
          </Form.Item>

          <Form.Item label="封面">
            <Form.Item name="type">
              <Radio.Group onChange={changeImgCoverType}>
                <Radio value={1}>单图</Radio>
                <Radio value={3}>三图</Radio>
                <Radio value={0}>无图</Radio>
              </Radio.Group>
            </Form.Item>
            {imgCoverType > 0 && (
              <Upload
                name="image"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList
                action="http://geek.itheima.net/v1_0/upload"
                fileList={fileList}
                onChange={onUploadChange}
                multiple={imgCoverType > 1}
                maxCount={imgCoverType}
              >
                <div style={{ marginTop: 8 }}>
                  <PlusOutlined />
                </div>
              </Upload>
            )}
          </Form.Item>
          <Form.Item
            label="内容"
            name="content"
            rules={[{ required: true, message: '请输入文章内容' }]}
          >
            <ReactQuill
              className="publish-quill"
              theme="snow"
              placeholder="请输入文章内容"
            />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 4 }}>
            <Space>
              <Button size="large" type="primary" htmlType="submit">
                {articleId ? '更新' : '发布'}文章
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default observer(Publish)