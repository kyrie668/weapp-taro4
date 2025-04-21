import React, { useEffect, useState } from "react";
import { View, Button, Image } from "@tarojs/components";
import Taro, { useDidShow } from "@tarojs/taro";
import { uploadFile, get } from "../../utils/request";
import "./index.less";

interface UserData {
  id: string;
  name: string;
  // 添加其他用户字段
}

export default function Upload() {
  const [filePath, setFilePath] = useState("");
  const [userData, setUserData] = useState<UserData | null>(null);
  useDidShow(() => {
    getUser();
    console.log("upload");
  });

  const getUser = async () => {
    try {
      const res = await get("/user/info");
      console.log(res);
    } catch (error) {
      console.error("ssss",error);
    }
  };

  // useEffect(() => {
  //   getUser();
  //   console.log("upload");
  // }, []);

  const chooseFile = () => {
    Taro.chooseImage({
      count: 1,
      sizeType: ["compressed"],
      sourceType: ["album", "camera"],
      success: (res) => {
        setFilePath(res.tempFilePaths[0]);
      },
    });
  };

  const handleUpload = async () => {
    if (!filePath) {
      Taro.showToast({
        title: "请先选择文件",
        icon: "none",
      });
      return;
    }

    try {
      const res = await uploadFile({
        url: "/resume/updateing",
        filePath,
        formData: {
          userId: userData?.id || "123",
          type: "image",
        },
      });

      Taro.showToast({
        title: "上传成功",
        icon: "success",
      });
      console.log("上传成功", res);
    } catch (err) {
      console.error("上传失败", err);
      if (err.errMsg?.includes("domain list")) {
        Taro.showModal({
          title: "上传失败",
          content:
            '请检查域名配置：\n1. 在开发者工具中勾选"不校验合法域名"\n2. 或在微信公众平台添加域名到白名单',
          showCancel: false,
        });
      } else {
        Taro.showToast({
          title: "上传失败",
          icon: "error",
        });
      }
    }
  };

  return (
    <View className="upload-container">
      <Button onClick={chooseFile}>选择dsdsadadsd文件</Button>
      {filePath && (
        <View className="preview">
          <Image src={filePath} mode="aspectFit" />
        </View>
      )}
      <Button onClick={handleUpload}>上传文件</Button>
    </View>
  );
}
