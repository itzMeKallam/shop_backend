New
echo "# shop_frontend" >> README.md
git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/itzMeKallam/shop_frontend.git
git push -u origin main


git remote add origin https://github.com/itzMeKallam/shop_backend.git
git branch -M main
git push -u origin main

Remove
git remote remove origin
