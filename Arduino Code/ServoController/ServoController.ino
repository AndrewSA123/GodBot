#include <Stepper.h>

#include <IRremote.h>
#include <ir_Lego_PF_BitStreamEncoder.h>


int IRPin = 10;
const int StepsPerRev = 800;

Stepper mystepper(StepsPerRev, 2, 4, 3, 5);

IRrecv irrecv(IRPin);
decode_results results;

void setup() {
  Serial.begin(9600);
  Serial.println("IR Buttons");
  irrecv.enableIRIn();
}

void loop() {

  if(irrecv.decode(&results)){
    translateIR();
    if(results.value == 0xFF30CF){
      mystepper.setSpeed(20);
      mystepper.step(StepsPerRev);
      mystepper.step(StepsPerRev);
      mystepper.step(StepsPerRev);
    }else if(results.value == 0xFF18E7){
      mystepper.setSpeed(20);
      mystepper.step(-StepsPerRev);
      mystepper.step(-StepsPerRev);
      mystepper.step(-StepsPerRev);
    }else if(results.value == 0xFF6897){
      mystepper.setSpeed(0);
    }
    delay(500);
    irrecv.resume();
  }
}


void translateIR() {          // takes action based on IR code received
// describing Remote IR codes 

  switch(results.value){
    case 0xFFA25D: Serial.println("POWER"); break;
    case 0xFFE21D: Serial.println("FUNC/STOP"); break;
    case 0xFF629D: Serial.println("VOL+"); break;
    case 0xFF22DD: Serial.println("FAST BACK");    break;
    case 0xFF02FD: Serial.println("PAUSE");    break;
    case 0xFFC23D: Serial.println("FAST FORWARD");   break;
    case 0xFFE01F: Serial.println("DOWN");    break;
    case 0xFFA857: Serial.println("VOL-");    break;
    case 0xFF906F: Serial.println("UP");    break;
    case 0xFF9867: Serial.println("EQ");    break;
    case 0xFFB04F: Serial.println("ST/REPT");    break;
    case 0xFF6897: Serial.println("0");    break;
    case 0xFF30CF: Serial.println("1");    break;
    case 0xFF18E7: Serial.println("2");    break;
    case 0xFF7A85: Serial.println("3");    break;
    case 0xFF10EF: Serial.println("4");    break;
    case 0xFF38C7: Serial.println("5");    break;
    case 0xFF5AA5: Serial.println("6");    break;
    case 0xFF42BD: Serial.println("7");    break;
    case 0xFF4AB5: Serial.println("8");    break;
    case 0xFF52AD: Serial.println("9");    break;
    case 0xFFFFFFFF: Serial.println(" REPEAT");break;  

  default: 
    Serial.print(" other button   ");
    Serial.println(results.value);

  }// End Case

}
