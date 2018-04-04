export PORT=5600
export MIX_ENV=prod
export GIT_PATH=/home/tasktrackaspa/src/TaskTrackaSPA 

mix ecto.create
mix ecto.migrate

PWD=`pwd`
if [ $PWD != $GIT_PATH ]; then
	echo "Error: Must check out git repo to $GIT_PATH"
	echo "  Current directory is $PWD"
	exit 1
fi

if [ $USER != "tasktrackaspa" ]; then
	echo "Error: must run as user 'tasktracka'"
	echo "  Current user is $USER"
	exit 2
fi

mix deps.get
(cd assets && npm install)
(cd assets && ./node_modules/brunch/bin/brunch b -p)
mix phx.digest
mix release --env=prod

mkdir -p ~/www
mkdir -p ~/old

NOW=`date +%s`
if [ -d ~/www/TaskTrackaSPA ]; then
	echo mv ~/www/TaskTrackaSPA ~/old/$NOW
	mv ~/www/TaskTrackaSPA ~/old/$NOW
fi

mkdir -p ~/www/TaskTrackaSPA
REL_TAR=~/src/TaskTrackaSPA/_build/prod/rel/tasktrackaspa/releases/0.0.1/tasktrackaspa.tar.gz
(cd ~/www/TaskTrackaSPA && tar xzvf $REL_TAR)

crontab - <<CRONTAB
@reboot bash /home/tasktrackaspa/src/TaskTrackaSPA/start.sh
CRONTAB

#. start.sh
