#!/bin/bash
sudo su -c "echo 1 > /sys/devices/platform/thinkpad_acpi/bluetooth_enable"
/usr/sbin/rfkill unblock bluetooth
sleep 2
sudo hciconfig hci0 up
sudo hciconfig hci0 piscan
