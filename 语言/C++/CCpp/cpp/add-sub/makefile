main.out:sub.o add.o main.o
	g++ -g -o main.out sub.o add.o main.o -lm

main.o:main.cpp
	g++ -g -c main.cpp

add.o:add.cpp
	g++ -g -c add.cpp

sub.o:sub.cpp
	g++ -g -c sub.cpp

clean:
	rm -f main.out main.o add.o sub.o
