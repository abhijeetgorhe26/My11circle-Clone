public class java {
    public static void main(String[] args) {
        int n = 153;

        n = 111;
        int sum = 0;

        while (n > 0) {
            // n = n / 10; --> 15; --> 1; --> 0
            int i = n % 10;// --> 3; --> 5 ; --> 1;

            sum = sum + (i * i * i);
            n = n / 10;
        }

        System.out.println(sum);
    }
}
// 153 = (1 * 1* 1) + (5*5*5) + (3*3*3);
// 1234 = (1 * 1* 1)+ (2*2*2) + (3*3*3) +(4*4*4)
// 1234 -> 1 2 3 4
// 1234 -> 4 * 4 * 4
// sum(0) = (sum:0) + (4 * 4 * 4);
// 123 -> 3*3*3
