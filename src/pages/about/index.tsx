import React, { useRef } from "react";
import {
  Form,
  Button,
  Input,
  type FormItemRuleWithoutValidator,
} from "@nutui/nutui-react-taro";

import { View, Text, Image } from "@tarojs/components";
import Taro, { useDidShow } from "@tarojs/taro";
import "./index.less";

export default function About() {
  useDidShow(() => {
    console.log("Page loaded.");
  });


  const submitFailed = (error: any) => {
    console.log(error);
    Taro.showToast({ title: JSON.stringify(error), icon: "error" });
  };

  const submitSucceed = (values: any) => {
    Taro.showToast({ title: JSON.stringify(values), icon: "success" });
  };

  // 函数校验
  const customValidator = (
    rule: FormItemRuleWithoutValidator,
    value: string
  ) => {
    return /^\d+$/.test(value);
  };

  const valueRangeValidator = (
    rule: FormItemRuleWithoutValidator,
    value: string
  ) => {
    return /^(\d{1,2}|1\d{2}|200)$/.test(value);
  };

  return (
    <View className="about">
      <View className="header">
        <Image
          className="logo"
          src="https://img.yzcdn.cn/vant/logo.png"
          mode="aspectFit"
        />
        <Text className="title">关于我们</Text>
      </View>
      <View className="content">
        <View className="section">
          <Text className="section-title">公司简介</Text>
          <Text className="section-content">
            我们是一家致力于提供优质服务的科技公司，成立于2020年。
            我们的使命是通过技术创新，为用户带来更好的体验。
          </Text>
        </View>
        <View className="section">
          <Text className="section-title">团队介绍</Text>
          <Text className="section-content">
            我们拥有一支充满激情和创造力的团队，团队成员来自各个领域，
            共同致力于打造优秀的产品和服务。
          </Text>
        </View>
        <View className="section">
          <Text className="section-title">联系我们</Text>
          <Text className="section-content">
            邮箱：contact@example.com 电话：123-4567-8910
            地址：某某市某某区某某街道123号
          </Text>
        </View>
      </View>
      <>
        <Form
          divider
          labelPosition="left"
          onFinish={(values) => submitSucceed(values)}
          onFinishFailed={(values, errors) => submitFailed(errors)}
          footer={
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
              }}
            >
              <Button nativeType="submit" type="primary">
                提交
              </Button>
              <Button nativeType="reset" style={{ marginLeft: "20px" }}>
                重置
              </Button>
            </div>
          }
        >
          <Form.Item
            label="字段A"
            name="username"
            rules={[{ required: true, message: "请输入字段A" }]}
          >
            <Input placeholder="请输入字段A" type="text" />
          </Form.Item>
          <Form.Item
            label="字段B"
            name="age"
            rules={[
              { required: true, message: "请输入字段B" },
              { validator: customValidator, message: "必须输入数字" },
              { validator: valueRangeValidator, message: "必须输入0-200区间" },
            ]}
          >
            <Input placeholder="请输入字段B，必须数字且0-200区间" type="text" />
          </Form.Item>
          <Form.Item
            label="字段C"
            name="tel"
            rules={[{ max: 13, message: "请输入字段C" }]}
          >
            <Input placeholder="字段C格式不正确" type="number" />
          </Form.Item>
          <Form.Item
            label="字段D"
            name="address"
            rules={[{ required: true, message: "请输入字段D" }]}
          >
            <Input placeholder="请输入字段D" type="text" />
          </Form.Item>
        </Form>
      </>
    </View>
  );
}
