pid_websersocket=$(pgrep -f "websersocket_92fce32b-643b-4eb0-9952-3a35be194aee.js")
watch -n 1 ps -p $pid_websersocket -o pid,etime,%cpu,%mem,cmd