import React, { Component } from "react";
import {
  Table,
  Input,
  InputNumber,
  Popconfirm,
  Form,
  Divider,
  Checkbox
} from "antd";
import { APIUtility } from "../../../httpHelper";
import clone from "clone";
import { translate } from "react-i18next";
const EditableContext = React.createContext();
const regEx = /^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/;
class EditableCell extends React.Component {
  getInput = () => {
    if (this.props.inputType === "number") {
      return <InputNumber />;
    }
    return <Input />;
  };

  renderCell = ({ getFieldDecorator }) => {
    const {
      editing,
      dataIndex,
      title,
      inputType,
      record,
      index,
      children,
      t,
      ...restProps
    } = this.props;
    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item style={{ margin: 0 }}>
            {getFieldDecorator(dataIndex, {
              rules: [
                {
                  pattern: regEx,
                  message: t("general_1:valid_positive_error_msg.message")
                }
              ],
              initialValue: record[dataIndex]
            })(this.getInput())}
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  };

  render() {
    const { t } = this.props;
    return (
      <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>
    );
  }
}

class EditableTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: [], loader: false, editingKey: "", dumpData: [] };
    this.t = this.props.t;
    this.columns = [
      {
        title: this.t("table_head_coin.message"),
        dataIndex: "coin"
      },
      {
        title: this.t("table_head_lower_limit.message"),
        dataIndex: "lower_limit",
        editable: true
      },
      {
        title: this.t("table_head_upper_limit.message"),
        dataIndex: "upper_limit",
        editable: true
      },
      {
        title: this.t("table_head_email_notification.message"),
        render: data => (
          <Checkbox
            value={data["is_email_notification"]}
            disabled={this.state.editingKey != data.coin_id}
            checked={data["is_email_notification"]}
            onChange={e =>
              this.handleOnChange(data, "is_email_notification", e)
            }
          />
        )
      },
      {
        title: this.t("table_head_sms_notification.message"),
        render: data => (
          <Checkbox
            value={data["is_sms_notification"]}
            checked={data["is_sms_notification"]}
            disabled={this.state.editingKey != data.coin_id}
            onChange={e => this.handleOnChange(data, "is_sms_notification", e)}
          />
        )
      },
      {
        title: "",
        dataIndex: "operation",
        render: (text, record) => {
          const { editingKey } = this.state;
          const editable = this.isEditing(record);
          return editable ? (
            <span>
              <EditableContext.Consumer>
                {form => (
                  <a
                    onClick={() => this.save(form, record.coin_id)}
                    style={{ marginRight: 8 }}
                  >
                    {this.t(
                      "edit_profile_titles:subhead_personal_form_save_btn.message"
                    )}
                  </a>
                )}
              </EditableContext.Consumer>
              <Popconfirm
                title={this.t(
                  "general_1:sure_cancel_popup_confirm_text.message"
                )}
                onConfirm={() => this.cancel(record.coin_id)}
                okText={this.t("conversion:ok_btn.message")}
                cancelText={this.t(
                  "edit_profile_titles:subhead_personal_form_cancel_btn.message"
                )}
              >
                <a>
                  {" "}
                  {this.t(
                    "edit_profile_titles:subhead_personal_form_cancel_btn.message"
                  )}
                </a>
              </Popconfirm>
            </span>
          ) : (
            <a
              disabled={editingKey !== ""}
              onClick={() => this.edit(record.coin_id)}
            >
              {this.t(
                "edit_profile_titles:subhead_personal_form_edit_btn.message"
              )}
            </a>
          );
        }
      }
    ];
  }

  componentDidMount() {
    this.getThresholdData();
  }
  handleOnChange = (data, type, event) => {
    let threshHoldData = this.state.data;
    let index = threshHoldData.indexOf(data);
    if (index > -1) {
      threshHoldData[index][type] = event.target.checked;
      this.setState({ data: threshHoldData });
    }
  };

  getThresholdData = async () => {
    try {
      this.setState({ loader: true });
      let res = await APIUtility.getThresholdData(this.props.isLoggedIn);
      if (res.status == 200) {
        this.setState({ data: res.data, dumpData: clone(res.data) });
      }
    } catch (error) {
    } finally {
      this.setState({ loader: false });
    }
  };

  isEditing = record => record.coin_id === this.state.editingKey;

  cancel = () => {
    let { dumpData } = this.state;
    this.setState({ editingKey: "", data: dumpData });
  };

  save(form, key) {
    form.validateFields(async (error, row) => {
      if (error) {
        return;
      }
      const newData = [...this.state.data];
      const index = newData.findIndex(item => key === item.coin_id);
      if (index > -1) {
        const item = newData[index];
        item["upper_limit"] = parseFloat(item["upper_limit"]);
        item["lower_limit"] = parseFloat(item["lower_limit"]);
        newData.splice(index, 1, {
          ...item,
          ...row
        });
        this.setState({ loader: true });
        try {
          let response = await APIUtility.setThresholdData(
            this.props.isLoggedIn,
            [
              {
                ...item,
                ...row
              }
            ]
          );
          if (response.status == 200) {
            await this.getThresholdData();
          }
        } catch (error) {
        } finally {
          this.setState({ loader: false });
        }

        this.setState({ data: newData, editingKey: "" });
      } else {
        newData.push(row);
        this.setState({ data: newData, editingKey: "" });
      }
    });
  }

  edit(key) {
    this.setState({ editingKey: key });
  }

  render() {
    const components = {
      body: {
        cell: translate(["general_1"])(EditableCell)
      }
    };
    const columns = this.columns.map(col => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: record => ({
          record,
          inputType: "text",
          dataIndex: col.dataIndex,
          title: col.title,
          editing: this.isEditing(record)
        })
      };
    });

    return (
      <EditableContext.Provider value={this.props.form}>
        <Table
          className="notification-table"
          components={components}
          bordered
          dataSource={this.state.data}
          columns={columns}
          rowClassName="editable-row"
          pagination={false}
          loading={this.state.loader}
        />
      </EditableContext.Provider>
    );
  }
}

const EditableFormTable = Form.create()(EditableTable);

export default translate([
  "settings",
  "edit_profile_titles",
  "conversion",
  "general_1"
])(EditableFormTable);
