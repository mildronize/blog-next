---
title: มือใหม่หัดใช้ลินุกซ์ครั้งแรก
description: >-
  ความพยายามของผมที่จะหัดใช้ลินุกซ์มามากกว่า 10 ครั้ง, ลินุกซ์คืออะไร,
  การแก้ปัญหาต่างๆ, Linux distrubtion, Debian, การบำรุงรักษา
tags:
  - Linux
  - Debian
language:
  - th
uuid: it3xlde
unsplashImgCoverId: 9XngoIpxcEo
---

โพสนี้เป็นการรวมเรื่องราวกันหัดใช้ linux ครั้งแรกของผมโดย จะแบ่งเป็นข้อๆ และก็จะค่อยๆ ทยอยเขียน
ทีละบทความ

## ความพยายามของผมที่จะหัดใช้ linux มามากกว่า 10 ครั้ง

**ครั้งแรกกับ Linux**

ผมติด Windows มากในสมัยเด็กๆ เพราะไม่ว่าจะมองไปทางไหนๆ ก็มีแต่คนใช้ Windows ที่มีหน้าตาที่
สวยงาม แต่แล้วสมัยตอนอยู่เรียนมัธยมต้น ก็ได้ยินข่าวเกี่ยวกับ Linux บ้างและอยากลองใช้ ผมพยายามติดตั้ง
และลองใช้งาน linux เป็นครั้งแรก โดยเลือกลง
เป็น [Ubuntu desktop](http://www.ubuntu.com/download/desktop)
พยายามลองใช้งานในโหมดของเป็นกราฟฟิคโหมด (GUI Mode) แต่แล้วก็พบว่า ไม่คุ้นชินกับหน้าตาและวิธี
การใช้งานเลย รวมถึงโปรแกรมต่างๆ ที่ใช้อยู่ใน windows ปกติก็ไม่มีให้ใช้ เลยสุดท้ายก็ถอดใจไปกลับไปใช้
Windows เหมือนเดิม

**ครั้งต่อๆ มา กับ Linux**

ในช่วงเวลาหลายปีที่ผ่านมาตั้งแต่ มัธยมต้นนั้นได้ พยายามลงและลองใช้ linux อยู่หลายครั้ง แต่ก็ยังไม่
เข้าใจถึงลักษณะการทำงาน และ วิธีใช้ รวมถึงวิธีการแก้ปัญหา ต่างๆ พอประสบปัญหาครั้งหนึี่งก็แก้ไม่ถูก
สุดท้ายก็แก้ไม่ถูก กับการที่ไม่มีโปแกรมที่คุ้นเคยเลย เลยทำให้ถอดใจไปอย่างมาก

แต่หลังจากที่ขึ้นมหาวิทยาลัยมา บวกกับในยุคสมัยที่มีโปรแกรม Cross Platform เกิดขึ้นมาเยอะมากทำให้
สามารถใช้งานได้ ค่อนข้างโอเคเลย บวกกับมีคนช่วยสอน ช่วยแนะนำการใช้งานให้ ต้องขอบคุณพี่
Thanathip Limna ที่ช่วยแนะนำหลายๆ เรื่อง

จนสุดท้ายก็เลยนำปัญหาที่ผมพบระหว่างการเริ่มหัดใช้งาน linux มาเขียนเป็นบทความอธิบายๆ การใช้ และ
ปัญหารวมถึงวิธีการแก้ปัญหาเป็นส่วนๆ ไป ตามหัวข้อด้านล่าง

## คู่มือการใช้งาน Linux ฉบับใช้ Debian เป็นกรณีศึกษา
- ลินุกซ์คืออะไร
- Linux distrubtion ไหนที่คุณชอบ เลือกมาหนึ่ง แล้วหัดใช้มัน
- การติดตั้ง Debian
- การใช้งานลินุกซ์ครั้งแรก
- ทำความเข้าใจเกี่ยวกับ Debian ซึ่งเป็นหนึ่งใน Linux distrubtion
- [ทำความเข้าใจเกี่ยวแต่ละรุ่นของ Debian]({{ /posts/2015-06-25-what-is-debian-version-sid-testing-stable/ | url }})
- [อัพเกรด Debian จาก stable เป็น sid]({{ /posts/2015-06-08-upgrade-debian-to-sid | url  }})
- **หัวข้อที่สำคัญ**: เราจะแก้ปัญหาอย่างไรที่พบระหว่างการติดตั้ง packages โดยที่สามารถเรียนรู้จากกรณีศึกษาด้านล่างนี้
    - [กรณีศึกษาที่ 1: การติดตั้ง Google Chrome บน Debian]({{ /posts/2015-06-22-how-to-install-google-chrome-on-debian | url }})
    - กรณีศึกษาที่ 2: การติดตั้ง Bracket บน Debian
- บำรุงรักษาและพยายามที่จะเรียนรู้สิ่งใหม่ๆ ตลอดเวลา

