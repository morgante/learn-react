## Building

	docker build -t learn-react .

## Running

	docker run -v /home/core/spider/learn-react:/app/src -p 48475:3000 -i -t learn-react