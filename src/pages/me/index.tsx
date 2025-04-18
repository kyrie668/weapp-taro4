import React from "react";
import { View, Text, Image } from "@tarojs/components";
import { useDidShow } from "@tarojs/taro";
import "./index.less";

export default function Me() {
  useDidShow(() => {
    console.log("Page loaded.");
  });

  return (
    <View className="me">
      <View className="user-info">
        <Image
          className="avatar"
          src="https://img.yzcdn.cn/vant/cat.jpeg"
          mode="aspectFill"
        />
        <View className="info">
          <Text className="name text-red">用户名</Text>
          <Text className="desc">这个人很懒，什么都没留下</Text>
        </View>
      </View>
      <View className="menu-list">
        <View className="menu-item">
          <Text className="label">我的收藏</Text>
          <Text className="arrow">&gt;</Text>
        </View>
        <View className="menu-item">
          <Text className="label">我的订单</Text>
          <Text className="arrow">&gt;</Text>
        </View>
        <View className="menu-item">
          <Text className="label">设置</Text>
          <Text className="arrow">&gt;</Text>
        </View>
        <View className="menu-item">
          <Text className="label">帮助与反馈</Text>
          <Text className="arrow">&gt;</Text>
        </View>
      </View>
    </View>
  );
}
