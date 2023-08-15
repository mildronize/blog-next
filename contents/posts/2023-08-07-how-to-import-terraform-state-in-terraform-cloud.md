---
title: วิธีการ Import Terraform State ใน Terraform Cloud
uuid: hye03ea
---

> Terraform v1.5.2

Terraform ไม่ให้เรา Import Resource ถ้าเราใช้ Variable ที่เป็น Secret บน Terraform Cloud

วิธีทำ 
1. Run terraform state pull > terraform.tfstate
2. Delete .terraform directory
3. Comment the backend "remote"
4. Run terraform init
5. Run terraform state list to make sure it's correct locally
6. Run terraform import XXX
7. Run terraform state list, because I'm scared of breaking things
8. Uncomment the backend "remote"
9. Delete .terraform directory (I love it)
10. Run terraform init
11. Compare with diff the 2 files indicated in the prompt to make sure the change is EXACTLY what I want.
12. Answer "yes"
Ref: https://github.com/hashicorp/terraform/issues/26494

