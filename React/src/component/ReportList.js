import React from 'react';
import { Button, Card, Form, Input, List, Modal, Radio } from 'antd';

// 定义一个管理员组件
class ReportList extends React.Component {
    // 定义组件的状态
    state = {
        // 平台活动列表
        activities: [
            {
                id: 1,
                title: '情人节特别活动',
                content: '参与平台内任意一场语音直播，就有机会获得精美礼品一份！',
                status: '进行中',
            },
            {
                id: 2,
                title: '春节红包大派送',
                content: '在平台内发出或收到红包，就能参与抽奖，赢取现金奖励！',
                status: '已结束',
            },
        ],
        // 举报列表
        reports: [
            {
                id: 1,
                reporter: '小明',
                reportedUser: '小红',
                reason: '骚扰信息',
                evidence:
                    '小红在私信中对我进行了不礼貌的言语攻击，并发送了一些不雅图片。',
            },
            {
                id: 2,
                reporter: '小花',
                reportedUser: '小黑',
                reason: '欺诈行为',
                evidence:
                    '小黑在语音聊天室中声称自己是某知名公司的高管，并向我索要了一些个人信息和银行卡号。',
            },
        ],
        // 是否显示创建活动的模态框
        showCreateActivityModal: false,
        // 是否显示处理举报的模态框
        showHandleReportModal: false,
        // 当前选中的举报对象
        currentReportId: null,
    };

    // 处理创建活动按钮点击事件
    handleCreateActivityClick = () => {
        this.setState({ showCreateActivityModal: true });
    };

    // 处理创建活动模态框取消事件
    handleCreateActivityCancel = () => {
        this.setState({ showCreateActivityModal: false });
    };

    // 处理创建活动表单提交事件
    handleCreateActivitySubmit = (values) => {
        const { activities } = this.state;
        const newActivity = {
            ...values,
            id:
                activities.length > 0 ? activities[activities.length - 1].id + 1 : 1,
            status:

                values.status === '1' ? '进行中' : '已结束',
        };
        this.setState({
            activities: [...activities, newActivity],
            showCreateActivityModal: false,
        });
    };

    // 处理处理举报按钮点击事件
    handleHandleReportClick = (reportId) => {
        this.setState({ showHandleReportModal: true, currentReportId: reportId });
    };

    // 处理处理举报模态框取消事件
    handleHandleReportCancel = () => {
        this.setState({ showHandleReportModal: false, currentReportId: null });
    };

    // 处理处理举报表单提交事件
    handleHandleReportSubmit = (values) => {
        const { reports } = this.state;
        const newReports = reports.filter(
            (report) => report.id !== this.state.currentReportId
        );
        this.setState({
            reports: newReports,
            showHandleReportModal: false,
            currentReportId: null,
        });
        // 根据 values.action 对被举报用户进行相应的操作，例如封禁、警告等，这里省略
    };

    // 渲染组件的界面
    render() {
        return (
            <div className="admin">

                <div className="admin-content">

                    <div className="admin-reports">
                        <h2>举报列表</h2>
                        <List
                            dataSource={this.state.reports}
                            renderItem={(item) => (
                                <List.Item key={item.id}>
                                    <Card title={`举报人：${item.reporter}`}>
                                        <p>被举报用户：{item.reportedUser}</p>
                                        <p>举报原因：{item.reason}</p>
                                        <p>证据描述：{item.evidence}</p>
                                        <Button type="danger" onClick={() => this.handleHandleReportClick(item.id)}>
                                            处理举报
                                        </Button>
                                    </Card>
                                </List.Item>
                            )}
                        />
                    </div>


                    {/* 处理举报的模态框 */}
                    {this.state.showHandleReportModal && (
                        <Modal
                            title="处理举报"
                            visible={true}
                            onCancel={this.handleHandleReportCancel}
                            footer={null}
                        >
                            {/* 处理举报的表单 */}
                            <Form onFinish={this.handleHandleReportSubmit}>
                                {/* 处理方式 */}
                                <Form.Item name="action" label="处理方式" rules={[{ required: true }]}>
                                    {/* 单选框组件 */}
                                    <Radio.Group>
                                        <Radio value="ban">封禁用户</Radio>
                                        <Radio value="warn">警告用户</Radio>
                                        <Radio value="ignore">忽略举报</Radio>
                                    </Radio.Group>
                                </Form.Item>


                                {/* 备注信息 */}
                                <Form.Item name="remark" label="备注信息">
                                    {/* 输入框组件 */}
                                    <Input.TextArea />
                                </Form.Item>
                                {/* 提交按钮 */}
                                <Form.Item>
                                    <Button type="primary" htmlType="submit">
                                        提交
                                    </Button>
                                </Form.Item>
                            </Form>
                        </Modal>
                    )}
                </div>
            </div>
        );
    }
}

// 导出组件
export default ReportList;