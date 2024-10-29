---
layout: page
title: Project Gallery
---

---

<br>

# 8-Bit Breadboard Computer

## Example: Fibonacci Sequence Calculation

<p><small>As an example, the computer is able to calculate the Fibonacci sequence (0, 1, 2, 3, 5, 8, 13, ...). This program is implemented into the computer as follows:</small></p>

<pre>
1) LOAD "0" into register A
2) LOAD "1" into register B
3) ADD A+B, load contents into register C
4) MOVE contents of register C into register A
5) ADD A+B, load contents into register D
6) MOVE contents of register D into register B
7) JUMP to step 3
</pre>

<p><small>This program demonstrates data loading into 4 registers and an unconditional jump instruction.</small></p>

### Video Demonstration

[video]

---

## Computer Architecture and Build

<!-- Image Pair -->
<div style="flex: 0 1 50%; text-align: center; display: flex; flex-direction: column; align-items: center;">
	<img src="/assets/files/projects/computer/architecture.png" style="width: 90%; height: auto; max-width: 100;" alt="C/2023 A3 (Tsuchinshan-ATLAS)" />
</div>

<p><small>This computer utilizes the von Neumann architecture where programs are stored in the same memory as data. It contains a clock module, program counter, memory address register and RAM module,  memory data register (MDR), instruction register (IR), and 4 general purpose registers labeled A through D. Finally, an EEPROM control logic module is used to drive the numerous CPU control signals to execute each microinstruction.</small></p>

<p><small>Overall, this computer runs on 4.5 volts from a benchtop DC power supply, drawing roughly 1.5 amps when all lights are on.</small></p>

### Clock Module (CLK)

<p><small>The clock module is driven by a 555 timer running in either the astable or monostable mode. The clock frequency can be adjusted using a potentiometer.</small></p>

### Program Counter (PC)

<p><small>The PC is a module in the computer that stores the next step in the program to be executed. It counts between 0 and 16, meaning that a program can contain a maximum of 16 steps.</small></p>

<p><small>It is built off a pair of 74LS161 synchronous 4-bit binary counters, although in practice, the computer only utilizes the first 4 bits of the counter.</small></p>

<p><small>This module supports three control signals: <code>Clear</code>, <code>Enable counting</code>, and <code>Load data</code>. Clearing wipes the contents of the counter, resetting it back to 0, while enable counting allows for the counter to count forward with each clock cycle. Finally, Load data allows the counter to load a value from the data bus, effectively functioning as a goto flag. Counting is done on the rising edge of each clock cycle.</small></p>

### Memory Address Register (MAR)

<p><small>The MAR is a register used to store RAM addresses. It reads a memory address from the data bus and feeds it to the RAM module. The design of this register is essentially the same as every other register, using a 74LS245 tri-state buffer to connect to the bus, and a pair of 74LS175 4-bit D-flip flops to store 8-bits of data in total.</small></p>

<p><small>This module has 2 control signals: <code>Clear</code> and <code>MAR In</code>. Clearing wipes the contents of the register, while <code>MAR in</code> loads the contents of the bus into the MAR.</small></p>

### Memory Data Register

<p><small>The MDR is a register used to store RAM data. After a memory address is provided to the RAM module, the output data is loaded into the MDR upon the next clock cycle. This register is designed the same as every other register in the computer.</small></p>

<p><small>This module has 3 control signals: <code>Clear</code>, <code>MDR In</code>, and <code>MDR Out</code>. Clear wipes the contents of the register, <code>MDR In</code> loads data in from the bus, allowing programs to write data to memory, and <code>MDR Out</code> outputs the contents to the bus.</small></p>

### Instruction Register (IR)

<p><small>The IR is a register that holds the current instruction being executed. Instructions are 8-bit words divided into a 4-bit Opcode and a 4-bit parameter. The IR is able to load instructions from the data bus, and output directly to the control logic module.</small></p>

<p><small>It has only two control signals: <code>Clear</code> and <code>IR In</code>. Clearing wipes the module and <code>IR In</code> loads the contents of the bus into the register.</small></p>

### Registers A-B (Ra, Rb, Rc, Rd)

<p><small>The computer contains four general purpose 8-bit registers for programs to use. The first two, A and B, directly load into the ALU, but the others, C and D, are independent of each other. Each register is capable of bidirectional communication with the bus, and is controlled by three control signals: <code>Clear</code>, <code>Register In</code>, <code>Register Out</code>.</small></p>

### Arithmetic Logic Unit (ALU)

<p><small>The ALU is a made of a pair of 74LS83 4-bit binary full adders, with a carry flag being activated if the sum overflows the 8 available bits. It is controlled by two control signals: <code>Clear</code> and <code>Sum Out</code>.</small></p>

### Control Logic

<p><small>The control logic is the heart of the computer, deciding which control flags to activate for each microinstruction. It is built out of 4 8-bit AT28C64 EEPROM IC's with 14 bit addresses.</small></p>

<p><small>Each 14 bit EEPROM address is broken down into 4-bit sections. The first 4 bits is the instruction Opcode, followed by the 4-bit parameters, and finally by a 4-bit microinstruction counter output. The last 2 bits are unused.</small></p>

<p><small>The 4-bit microinstruction counter allows for 16 microinstructions per instruction, where each microinstruction is a set of control signals to set high during each clock cycle.</small></p>

<p><small>The EEPROM output is directly linked to the control signals of the CPU, allowing the control logic to decide which signals need to be set high for each input.</small></p>

## Open Source Schematics

I am currently working on a set of circuit schematics for this computer, along with the exact BOM used. These should be coming out in a few months, and will be freely available here.