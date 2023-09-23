import locale from 'antd/es/date-picker/locale/zh_CN'
import 'dayjs/locale/zh-cn'
import { message, Table, Tag, Space, Card, Breadcrumb, Form, Button, Radio, DatePicker, Select } from 'antd'
import './index.scss'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import img404 from '@/assets/error.png'
import { useEffect, useState } from 'react'
import { http } from '@/utils'

const { Option } = Select
const { RangePicker } = DatePicker

const Article = () => {
  const [channels, setChannels] = useState([])
  const [article, setArticle] = useState({
    list: [],
    count: 0
  })
  const [params, setParams] = useState({
    page: 1,
    per_page: 10
  })
  const getChannel = async () => {
    const res = await http.get('/channels')
    setChannels(res.data.channels)
  }
  useEffect(() => {
    getChannel()
  }, [])
  useEffect(() => {
    const getArticle = async () => {
      const res = await http.get('/mp/articles', { params })
      if (res.message === 'OK') {
        setArticle({
          list: res.data.results,
          count: res.data.total_count
        })
      }
    }
    getArticle()
  }, [params])
  const onSubitSearch = ({ status, channel_id, date }) => {
    const temParams = {
      page: 1,
      per_page: 10
    }
    if (status !== -1) {
      temParams.status = status
    }
    if (channel_id) {
      temParams.channel_id = channel_id
    }
    if (date) {
      temParams.begin_pubdate = date[0].format('YYYY-MM-DD')
      temParams.end_pubdate = date[1].format('YYYY-MM-DD')
    }
    setParams(temParams)
  }
  const pageChange = (page) => {
    setParams({
      ...params,
      page
    })
  }
  const deleteArticle = async (val) => {
    const res = await http.delete(`/mp/articles/${val.id}`)
    if (res.message === 'OK') {
      message.success('删除成功!')
      setArticle({
        list: article.list.filter(item => item.id !== val.id),
        count: article.count - 1
      })
    }
  }
  const columns = [
    {
      title: '封面',
      dataIndex: 'cover',
      width: 120,
      render: cover => {
        return <img src={cover.images[0] || img404} width={80} height={60} alt="" />
      }
    },
    {
      title: '标题',
      dataIndex: 'title',
      width: 220
    },
    {
      title: '状态',
      dataIndex: 'status',
      render: data => <Tag color="green">审核通过</Tag>
    },
    {
      title: '发布时间',
      dataIndex: 'pubdate'
    },
    {
      title: '阅读数',
      dataIndex: 'read_count'
    },
    {
      title: '评论数',
      dataIndex: 'comment_count'
    },
    {
      title: '点赞数',
      dataIndex: 'like_count'
    },
    {
      title: '操作',
      render: data => {
        return (
          <Space size="middle">
            <Button type="primary" shape="circle" icon={<EditOutlined />} />
            <Button
              type="primary"
              danger
              shape="circle"
              onClick={() => deleteArticle(data)}
              icon={<DeleteOutlined />}
            />
          </Space>
        )
      }
    }
  ]
  return (
    <div>
      <Card
        title={
          <Breadcrumb separator=">" items={[{ title: '首页', href: "/" }, { title: '内容管理' }]} />
        }
        style={{ marginBottom: 20 }}
      >
        <Form initialValues={{ status: -1 }} onFinish={onSubitSearch}>
          <Form.Item label="状态" name="status">
            <Radio.Group>
              <Radio value={-1}>全部</Radio>
              <Radio value={0}>草稿</Radio>
              <Radio value={1}>待审核</Radio>
              <Radio value={2}>审核通过</Radio>
              <Radio value={3}>审核失败</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item label="频道" name="channel_id">
            <Select
              placeholder="请选择文章频道"
              style={{ width: 120 }}
            >
              {channels.map(channel => <Option key={channel.id} value={channel.id}>{channel.name}</Option>)}
            </Select>
          </Form.Item>

          <Form.Item label="日期" name="date">
            {/* 传入locale属性 控制中文显示*/}
            <RangePicker locale={locale}></RangePicker>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ marginLeft: 80 }}>
              筛选
            </Button>
          </Form.Item>
        </Form>
      </Card>
      <Card title={`根据筛选条件共查询到 ${article.count} 条结果：`}>
        <Table rowKey="id"
          columns={columns}
          dataSource={article.list}
          pagination={{
            pageSize: params.per_page,
            total: article.count,
            onChange: pageChange
          }}
        />
      </Card>
    </div>
  )
}

export default Article