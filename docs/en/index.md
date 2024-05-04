---
pageType: home
linkFeed: blog-en

hero:
  # name: veScale
  text: A PyTorch Native LLM Training Framework
  tagline: An Industrial-Level Framework for Ease-of-Use
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
    details: veScale parallelizes model execution with a synergy of strategies (tensor, sequence, data, ZeRO, pipeline parallelism) under semi- or full-automation [coming soon].
    icon: 🎯
  
  - title: Eager & Compile Mode
    details: veScale supports not only Eager-mode automation for parallel training and inference but also Compile-mode for ultimate performance [coming soon].
    icon: ⚡

  - title: Automatic Checkpoint Resharding
    details: veScale manages distributed checkpoints automatically with online resharding across different cluster sizes and different parallelism strategies. 
    icon: 📀
    
---