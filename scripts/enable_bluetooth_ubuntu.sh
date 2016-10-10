#!/bin/bash
/usr/sbin/rfkill unblock bluetooth
sudo su -c "echo 1 > /sys/devices/platform/thinkpad_acpi/bluetooth_enable"
sudo hciconfig hci0 up
sudo hciconfig hci0 piscan
