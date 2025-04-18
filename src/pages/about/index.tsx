import React from 'react'

import { View, Text, Image } from '@tarojs/components'
import { useDidShow } from '@tarojs/taro'
import './index.less'

export default function About() {
  useDidShow(() => {
    console.log('Page loaded.')
  })

  return (
    <View className='about'>
      <View className='header'>
        <Image
          className='logo'
          src='https://img.yzcdn.cn/vant/logo.png'
          mode='aspectFit'
        />
        <Text className='title'>关于我们</Text>
      </View>
      <View className='content'>
        <View className='section'>
          <Text className='section-title'>公司简介</Text>
          <Text className='section-content'>
            我们是一家致力于提供优质服务的科技公司，成立于2020年。
            我们的使命是通过技术创新，为用户带来更好的体验。
          </Text>
        </View>
        <View className='section'>
          <Text className='section-title'>团队介绍</Text>
          <Text className='section-content'>
            我们拥有一支充满激情和创造力的团队，团队成员来自各个领域，
            共同致力于打造优秀的产品和服务。
          </Text>
        </View>
        <View className='section'>
          <Text className='section-title'>联系我们</Text>
          <Text className='section-content'>
            邮箱：contact@example.com
            电话：123-4567-8910
            地址：某某市某某区某某街道123号
          </Text>
        </View>
      </View>
    </View>
  )
}
