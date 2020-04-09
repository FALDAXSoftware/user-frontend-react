import React, { Component } from 'react';
import { Layout, Row, Col, Select, Divider, Icon, Switch, Input, Alert } from 'antd';
import styled from 'styled-components';
const { Sider } = Layout;
const SidebarHeader = styled.h4`
    font-weight: bold;
    i.close{
        position: absolute;
        top: 0;
        right: 0;
        cursor:pointer;
    }
    i.save{
        position: absolute;
        top: 0;
        right: 30px;
        cursor:pointer;
        float: right;
        font-size: 21px;
        font-weight: 700;
        line-height: 1;
        color: #000;
        text-shadow: 0 1px 0 #fff;
        filter: alpha(opacity=20);
        opacity: .2;
        :hover {
            color: #000;
            text-decoration: none;
            cursor: pointer;
            filter: alpha(opacity=50);
            opacity: .5;
        }
    }
    i.share{
        position: absolute;
        top: 0;
        right: 63px;
        cursor:pointer;
        float: right;
        font-size: 21px;
        font-weight: 700;
        line-height: 1;
        color: #000;
        text-shadow: 0 1px 0 #fff;
        filter: alpha(opacity=20);
        opacity: .2;
        :hover {
            color: #000;
            text-decoration: none;
            cursor: pointer;
            filter: alpha(opacity=50);
            opacity: .5;
        }
    }
`;
const ExportIcon = styled(Icon)`
        // cursor:pointer;
        // font-size: 21px;
        // font-weight: 700;
        // line-height: 1;
        // color: #000;
        // text-shadow: 0 1px 0 #fff;
        // filter: alpha(opacity=20);
        // opacity: .2;
        // :hover {
        //     color: #000;
        //     text-decoration: none;
        //     cursor: pointer;
        //     filter: alpha(opacity=50);
        //     opacity: .5;
        // }
`
class TemplateSideBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            templates: [],
            templateName: ""
        }
    }
    componentDidMount() {
        this.setState({ templates: [...this.props.templates] }, () => {
            if (this.state.templates[this.props.selected]) {
                this.setState({
                    templateName: this.state.templates[this.props.selected].title
                })
            }
        });

    }
    UNSAFE_componentWillReceiveProps(nextProps) {
        if (this.state.templates != nextProps.templates || this.props.selected != nextProps.selected) {
            this.setState({ templates: [...nextProps.templates] }, () => {
                this.setState({
                    templateName: nextProps.templates[this.props.selected].title
                })
            });
        }
    }
    onWidgetCheckChange = (checked, widgetIndex) => {
        let templates = this.state.templates
        templates[this.props.selected].widgets[widgetIndex].checked = checked
        this.props.onChange(templates)
    }
    onWidgetDataChange = (value, widgetIndex) => {
        let templates = this.state.templates
        templates[this.props.selected].widgets[widgetIndex].data = value
        this.props.onChange(templates)
    }
    addNewTemplate = () => {
        let newTemplate = {}
        let templates = [...this.state.templates]
        newTemplate["widgets"] = []
        newTemplate["layouts"] = {}
        newTemplate["title"] = "Untitled Template"
        newTemplate["inbuilt"] = false
        for (let index = 0; index < this.state.templates[0].widgets.length; index++) {
            const w = this.state.templates[0].widgets[index];
            newTemplate["widgets"].push({
                ...w,
                data: [],
                checked: false
            })
        }
        templates.push(newTemplate)
        this.props.onChange(templates)
    }
    onNameChange = (e) => {
        this.setState({
            templateName: e.target.value
        })
    }
    handleNameInputBlur = (e) => {
        console.log(e.target.value);
        let templates = [...this.state.templates]
        if (e.target.value && this.state.templates[this.props.selected].title != e.target.value) {
            templates[this.props.selected].title = e.target.value
            this.props.onChange(templates)
        } else {
            this.setState({
                templateName: templates[this.props.selected].title
            })
        }
    }

    render() {

        return (
            <Sider width={250} style={{ transition: "all 1s ease", background: '#fff', marginTop: "90px", marginBottom: "10px", padding: "30px 20px", boxShadow: "-1px 5px 31px -10px rgba(0,0,0,0.53)" }}>
                <Row>
                    <Col span={24} >
                        <SidebarHeader>Customize <Icon type="import" className="share" onClick={this.props.onSave} /> <Icon type="save" className="save" onClick={this.props.onSave} /> <Icon type="close" className="close" onClick={this.props.closeEditing} /></SidebarHeader>
                    </Col>
                </Row>
                <Divider style={{ margin: "4px 0 24px" }} />
                <Row gutter={16} style={{ marginBottom: "15px" }}>
                    <Col span={24}>
                        <h5><b>Templates</b></h5>
                    </Col>
                    <Col span={24}>
                        <Select value={this.props.selected} style={{ width: "100%" }} onChange={this.props.onCurrentTemplateChange}
                            dropdownRender={menu => (
                                <div>
                                    {menu}
                                    <Divider style={{ margin: '4px 0' }} />
                                    <div
                                        style={{ padding: '4px 8px', cursor: 'pointer' }}
                                        onMouseDown={e => e.preventDefault()}
                                        onClick={this.addNewTemplate}
                                    >
                                        <Icon type="plus" /> Add item
                              </div>
                                </div>
                            )}>
                            {this.state.templates.map((t, index) => (
                                <Select.Option value={index}>{t.title}</Select.Option>
                            ))}
                        </Select>
                    </Col>
                </Row>
                {this.state.templates[this.props.selected]?.inbuilt &&
                    <Row style={{ marginBottom: "15px" }}>
                        <Col>
                            <Alert
                                message="If you want customized dashboard, create your own."
                                type="info"
                            // showIcon
                            />
                        </Col>
                    </Row>
                }
                {!this.state.templates[this.props.selected]?.inbuilt &&
                    <Row style={{ marginBottom: "15px" }}>
                        <Col>
                            <a><ExportIcon type="export" className="share" /> Export Template</a>
                        </Col>
                    </Row>
                }
                {this.state.templates[this.props.selected] && !this.state.templates[this.props.selected].inbuilt &&
                    <Row gutter={16} style={{ marginBottom: "15px" }}>
                        <Col span={24}>
                            <h5><b>Template Name</b></h5>
                        </Col>
                        <Col span={24}>
                            <Input placeholder="Enter Template Name" value={this.state.templateName} onChange={this.onNameChange} onBlur={this.handleNameInputBlur} onPressEnter={this.handleNameInputBlur} />
                        </Col>
                    </Row>
                }
                {this.state.templates[this.props.selected] &&

                    <Row gutter={16}>
                        <Col span={24}>
                            <h5><b>Widgets</b></h5>
                        </Col>
                        <Col span={24}>
                            {
                                this.state.templates[this.props.selected].widgets.map((w, index) => (
                                    <Row style={{ marginBottom: "20px" }} type="flex" align="middle">
                                        <Col span={6}>
                                            <Switch
                                                disabled={this.state.templates[this.props.selected].inbuilt}
                                                checked={w.checked}
                                                onChange={checked => {
                                                    this.onWidgetCheckChange(checked, index);
                                                }}
                                            ></Switch>
                                        </Col>
                                        <Col span={18}>
                                            {w.name}
                                        </Col>
                                        {w.checked && w.multiple &&
                                            < Col span={24}>
                                                <Select
                                                    value={w.data}
                                                    mode="multiple"
                                                    style={{ width: "100%", marginTop: "10px" }}
                                                    onChange={(value) => { this.onWidgetDataChange(value, index) }}
                                                    placeholder="Select Pair"
                                                    disabled={this.state.templates[this.props.selected].inbuilt}>
                                                    {this.props.pairs.map((p) => (
                                                        <Select.Option key={p.name}>
                                                            {p.name}
                                                        </Select.Option>
                                                    ))}
                                                </Select>
                                            </Col>
                                        }
                                    </Row>

                                ))
                            }
                        </Col>
                    </Row>
                }
            </Sider>
        );
    }
}

export default TemplateSideBar;