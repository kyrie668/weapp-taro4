import React, { useEffect, useRef } from "react";
import { View, Text, Image } from "@tarojs/components";
import { useDidShow } from "@tarojs/taro";
import { TrendArrow, Cell } from "@nutui/nutui-react-taro";
import "./index.less";

export default function Home() {
  useDidShow(() => {
    console.log("Page loaded.");
  });

  return (
    <View className="home">
      <View className="banner">
        <Image
          className="banner-image"
          src="https://img.yzcdn.cn/vant/cat.jpeg"
          mode="aspectFill"
        />
      </View>
      <View className="content">
        <View className="card">
          <Text className="title font-bold">欢迎来到首页</Text>
          <Text className="desc">
            这是一个美观的首页设计，包含了轮播图、卡片等元素
          </Text>
        </View>
        <View className="features">
          <View className="feature-item">
            <Text className="feature-title">功能一</Text>
            <Text className="feature-desc">描述功能一的内容</Text>
          </View>
          <View className="feature-item">
            <Text className="feature-title">功能二</Text>
            <Text className="feature-desc">描述功能二的内容</Text>
          </View>
          <View className="feature-item">
            <Text className="feature-title">功能三</Text>
            <Text className="feature-desc">描述功能三的内容</Text>
          </View>
        </View>
      </View>
    </View>
  );
}
