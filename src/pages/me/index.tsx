import React, { useState } from "react";
import { ImagePreview, Cell, Image } from "@nutui/nutui-react-taro";
import { View, Text, Image as TaroImage } from "@tarojs/components";
import { useDidShow } from "@tarojs/taro";
import {
  CommonEventFunction,
  SwiperProps as TaroSwiperProps,
} from '@tarojs/components'
import { Swiper } from '@nutui/nutui-react-taro'
import "./index.less";

const list = [
  'https://storage.360buyimg.com/jdc-article/NutUItaro34.jpg',
  'https://storage.360buyimg.com/jdc-article/NutUItaro2.jpg',
  'https://storage.360buyimg.com/jdc-article/welcomenutui.jpg',
  'https://storage.360buyimg.com/jdc-article/fristfabu.jpg',
]

export default function Me() {
  useDidShow(() => {
    console.log("Page loaded.");
  });
  const onChange: CommonEventFunction<TaroSwiperProps.onChangeEventDetail> = (
    e
  ) => {
    console.log(`onChange is trigger ${e}`)
  }

  const images = [
    {
      src: "https://fastly.jsdelivr.net/npm/@vant/assets/apple-4.jpeg",
    },
    {
      src: "https://m.360buyimg.com/mobilecms/s750x366_jfs/t1/26597/30/4870/174583/5c35c5d2Ed55eedc6/50e27870c25e7a82.png",
    },
    {
      src: "https://m.360buyimg.com/mobilecms/s750x366_jfs/t1/9542/17/12873/201687/5c3c4362Ea9eb757d/60026b40a9d60d85.jpg",
    },
    {
      src: "https://m.360buyimg.com/mobilecms/s750x366_jfs/t1/30042/36/427/82951/5c3bfdabE3faf2f66/9adca782661c988c.jpg",
    },
  ];
  const [showPreview, setShowPreview] = useState(false);
  const [init, setInit] = useState<any>(2);

  return (
    <View className="me">
      <View className="user-info">
        <TaroImage
          className="avatar"
          src="https://img.yzcdn.cn/vant/cat.jpeg"
          mode="aspectFill"
        />
        <View className="info">
          <Text className="name text-red">用户名</Text>
          <Text className="desc">这个人很懒，什么都没留下</Text>
        </View>
      </View>
      <Swiper defaultValue={1} autoPlay indicator onChange={onChange}>
      {list.map((item, index) => (
        <Swiper.Item key={item}>
          <TaroImage
            style={{ width: '100%', height: '100%' }}
            onClick={() => console.log(index)}
            src={item}
          />
        </Swiper.Item>
      ))}
    </Swiper>
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
      <>
        <Cell style={{ position: "relative" }}>
          {images.map((image, index) => (
            <View
              key={image.src}
              onClick={() => {
                setShowPreview(true);
                setInit(index + 1);
              }}
              style={{ marginRight: "10px" }}
            >
              <Image width={30} height={30} src={image.src} />
            </View>
          ))}
        </Cell>
        <ImagePreview
          autoPlay
          images={images}
          visible={showPreview}
          defaultValue={init}
          onClose={() => setShowPreview(false)}
          indicator
        />
      </>
    </View>
  );
}
