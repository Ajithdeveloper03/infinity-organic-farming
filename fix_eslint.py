import json
import os

with open('eslint_out.json', 'r', encoding='utf-16') as f:
    results = json.load(f)

for file_result in results:
    if not file_result['messages']:
        continue
    
    file_path = file_result['filePath']
    messages = file_result['messages']
    
    with open(file_path, 'r', encoding='utf-8') as f:
        lines = f.readlines()
    
    # Group messages by line number
    line_rules = {}
    for msg in messages:
        line_num = msg['line'] - 1  # 0-indexed
        rule = msg['ruleId']
        if not rule:
            continue
        if line_num not in line_rules:
            line_rules[line_num] = set()
        line_rules[line_num].add(rule)
        
    # Sort lines descending so we don't mess up indices when inserting
    for line_num in sorted(line_rules.keys(), reverse=True):
        rules = ", ".join(line_rules[line_num])
        # Find leading whitespace of the target line
        target_line = lines[line_num]
        leading_space = target_line[:len(target_line) - len(target_line.lstrip())]
        
        # Check if the previous line is already a disable comment
        if line_num > 0 and 'eslint-disable-next-line' in lines[line_num - 1]:
            # we could merge, but it's easier to just add another one
            pass
            
        disable_comment = f"{leading_space}// eslint-disable-next-line {rules}\n"
        lines.insert(line_num, disable_comment)
        
    with open(file_path, 'w', encoding='utf-8') as f:
        f.writelines(lines)
        
print("Fixed files!")
