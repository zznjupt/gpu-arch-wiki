#!/bin/bash

echo "🚀 数据精度格式知识图谱"
echo ""
echo "选择启动方式："
echo "1. 在浏览器中打开 (推荐)"
echo "2. 启动本地服务器 (端口 8000)"
echo ""
read -p "请输入选项 (1 或 2): " choice

case $choice in
    1)
        echo "📂 正在打开页面..."
        cd web && open index.html
        echo "✅ 已在浏览器中打开"
        ;;
    2)
        echo "🌐 启动本地服务器..."
        echo "📍 访问地址: http://localhost:8000"
        echo "⏹️  按 Ctrl+C 停止服务器"
        cd web && python3 -m http.server 8000
        ;;
    *)
        echo "❌ 无效选项，请重新运行脚本"
        exit 1
        ;;
esac
