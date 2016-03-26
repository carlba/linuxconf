#!/bin/bash
if [[ -e "/usr/local/lib/libstderred.so" ]]; then
  export LD_PRELOAD="/usr/local/lib/libstderred.so${LD_PRELOAD:+:$LD_PRELOAD}"
fi