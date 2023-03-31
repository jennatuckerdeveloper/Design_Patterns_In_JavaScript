let x = 0
for (x; x < 5; x++) {
  console.log(x)
	setTimeout(() => console.log(x), x * 1000)
}
