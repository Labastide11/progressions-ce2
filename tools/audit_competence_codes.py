#!/usr/bin/env python3
from pathlib import Path
import re, sys
root=Path(__file__).resolve().parents[1]
pat=re.compile(r'\b[A-Z]{2,8}-P[1-5]-\d{2}\b')
canon=set(pat.findall((root/'data.js').read_text(encoding='utf-8',errors='ignore')))
problems=[]
for p in list(root.glob('*.js'))+list(root.glob('*.html')):
    if p.name=='emploi-du-temps.js':
        # neutralized compatibility stub; no canonical schedule data lives here anymore
        pass
    text=p.read_text(encoding='utf-8',errors='ignore')
    bad=sorted(set(pat.findall(text))-canon)
    if bad: problems.append((p.name,bad))
print(f'Codes canoniques uniques : {len(canon)}')
if problems:
    for name,bad in problems: print(f'{name}: {", ".join(bad)}')
    sys.exit(1)
print('OK — 0 code actif utilisé hors référentiel.')
