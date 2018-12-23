main.out:sub.o add.o main.o
	gcc -g -o main.out sub.o add.o main.o -lm

main.o:main.c
	gcc -g -c main.c

add.o:add.c
	gcc -g -c add.c

sub.o:sub.c
	gcc -g -c sub.c

clean:
	rm -f main.out main.o add.o sub.o
