# 📚 Seeds de Perfumes de Referência

## Status dos Seeds

✅ **Completos (10 perfumes):**
1. Baccarat Rouge 540 — Maison Francis Kurkdjian
2. Imagination — Louis Vuitton
3. Tygar — Bvlgari
4. Hugo Boss Bottled — Hugo Boss
5. Sauvage — Dior
6. Bleu de Chanel — Chanel
7. Light Blue — Dolce & Gabbana
8. 1 Million — Paco Rabanne
9. La Vie Est Belle — Lancôme
10. Invictus — Paco Rabanne
11. Acqua di Gio — Giorgio Armani
12. Aventus — Creed
13. Versace Eros — Versace
14. Jean Paul Gaultier Le Male — JPG
15. Dolce & Gabbana The One — D&G

📝 **Pendentes (20 perfumes):**
16-35: Criar fórmulas seguindo o mesmo padrão

## Ordem de Execução dos Seeds

Execute os arquivos SQL na seguinte ordem:

```bash
1. seed_reference_perfumes.sql (perfumes 1-5)
2. seed_reference_perfumes_part2.sql (perfumes 6-10)
3. seed_reference_perfumes_part3.sql (perfumes 11-15)
4. seed_reference_perfumes_part4.sql (perfumes 16-25) - A CRIAR
5. seed_reference_perfumes_part5.sql (perfumes 26-35) - A CRIAR
```

## Perfumes Restantes para Implementar

### Masculinos (16-20):
16. Dior Homme Intense (EDP · Floral Amadeirado)
17. Tom Ford Noir Extreme (EDP · Oriental Amadeirado)
18. Yves Saint Laurent Y (EDP · Aromático Fougère)
19. Montblanc Explorer (EDP · Amadeirado Aromático)
20. Azzaro Wanted by Night (EDP · Especiado Amadeirado)

### Femininos (21-28):
21. Coco Mademoiselle — Chanel (EDP · Floral Oriental)
22. J'adore — Dior (EDP · Floral)
23. Black Opium — YSL (EDP · Floral Gourmand)
24. Good Girl — Carolina Herrera (EDP · Floral Oriental)
25. Flowerbomb — Viktor & Rolf (EDP · Floral Oriental)
26. Chance Eau Tendre — Chanel (EDT · Floral Frutal)
27. Si — Giorgio Armani (EDP · Chipre Floral)
28. Miss Dior — Dior (EDP · Floral Chipre)

### Unissex (29-35):
29. CK One — Calvin Klein (EDT · Cítrico Aromático)
30. Le Labo Santal 33 (EDP · Amadeirado Aromático)
31. Molecule 01 — Escentric Molecules (EDT · Amadeirado Minimalista)
32. Maison Margiela Replica Jazz Club (EDT · Oriental Amadeirado)
33. Tom Ford Oud Wood (EDP · Oriental Amadeirado)
34. Byredo Gypsy Water (EDP · Aromático Amadeirado)
35. Escentric 02 — Escentric Molecules (EDT · Amadeirado Almiscarado)

## Estrutura de Cada Perfume

Cada perfume deve ter:
- **Metadados:** nome, marca, ano, perfumista, gênero, família, subfamília, concentração, descrição, score
- **Notas de Topo:** 2-5 químicos com % sugerida
- **Notas de Coração:** 3-6 químicos com % sugerida
- **Notas de Fundo:** 3-8 químicos com % sugerida
- **Notas-chave:** Marcar com `is_key_note = true` as notas assinatura

## Total de Percentuais

A soma de todos os percentuais sugeridos deve ficar entre **55-75%** (base aromática), deixando espaço para:
- Álcool: 20-40%
- Coadjuvantes: 0-5%
- Água: 0-10%

## Próximos Passos

1. ✅ Criar migrations (014, 015)
2. ✅ Criar seeds parciais (15 perfumes)
3. ⏳ Completar seeds (20 perfumes restantes)
4. ⏳ Criar tipos TypeScript
5. ⏳ Criar componentes React
6. ⏳ Integrar na Calculadora Avançada
