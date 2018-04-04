
#!/bin/bash

export PORT=5600
export MIX_ENV=prod

cd ~/www/TaskTrackaSPA
./bin/tasktrackaspa stop || true
./bin/tasktrackaspa start
