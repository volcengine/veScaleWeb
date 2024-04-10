---
pageType: home
linkFeed: blog-en

hero:
  name: veScale
  text: A PyTorch Native LLM Training Framework
  # tagline: From a practical production perspective.
  image:
    src: /icon.png
    alt: logo
  actions:
    - theme: brand
      text: Introduction
      link: /guide/introduction
    - theme: alt
      text: Quick Start
      link: /guide/quick-start

features:
  - title: PyTorch Native
    details: veScale is rooted in PyTorch-native data structures, operators, and APIs, enjoying the ecosystem of PyTorch that dominates the ML world.
    icon: 🔥
  
  - title: Zero Model Code Change
    details: veScale decouples distributed system design from model architecture, requiring near-zero or zero modification on the model code of users.
    icon: 🛡

  - title: Single Device Abstraction
    details: veScale provides single-device semantics to users, automatically distributing and orchestrating model execution in a cluster of devices. 
    icon: 🚀
  
  - title: Automatic Parallelism Planning
    details: veScale parallelizes model execution with a synergy of strategies (tensor/sequence/data/ZeRO/pipeline parallelism) under semi- or full-automation [TBA].
    icon: 🎯
  
  - title: Eager & Compile Mode
    details: veScale supports not only Eager-mode automation for parallel training/inference but also Compile-mode for ultimate performance [TBA].
    icon: ⚡ 

  - title: Open Source & Reproducibility
    details: veScale is an open-source project, ensuring easy access and utilization for companies and research institutions alike. 
    icon: 🌐 
    
---