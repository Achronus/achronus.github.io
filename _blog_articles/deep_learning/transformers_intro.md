---
title: Transformers - The Frontier of ML Generalisation
desc: A fundamental Machine Learning algorithm consisting of layers of interconnected nodes (neurons) used for solving classification and prediction problems.
img_url: transformer-model-simple.png
date: 03/06/2023
tag: ml
topic: deep_learning
type: article
permalink: /blog/deep_learning/:title
layout: single-page
---
Over the past few years, Machine Learning (ML) has recently begun transitioning from different models in multiple-disciplinary fields (such as computer vision, speech recognition, and natural language processing (NLP)) into one single format - language (Centre for Humane Technology, 2023). The architecture paving the way is the Transformer, an elegant Deep Learning (DL) model, first introduced in the paper _"Attention Is All You Need"_ by Vaswani et al. (2017). This article acts as a roadmap in a series of posts that delves into the components of the Transformer to understand how they work together to enable deep language understanding and generative capabilities.

Firstly, we explore old NLP models. Next, we build a general understanding of what transformers are and discuss their architecture. Lastly, we provide a high-level overview of its components with directions to their unique articles for more information with code examples.

## The Old: RNNs and LSTMs
Before the Transformers' creation, Recurrent Neural Networks (RNNs) and Long Short Term-Memory (LSTMs) were the best architectures for solving sequence modelling and transduction problems. These models accept a sequence of sequential data that follows a particular order (e.g., text or time-series data) using a type of recurrence in the form of cells (blocks of operations). RNN's power comes from their ability to store a small amount of information from their inputs which is then recycled back into the network with the next set of inputs, providing an element of short-term memory.

<html>{%- include single_parts/image.html url="rnn.png" alt="An unrolled RNN" label="Figure 1.1. An unrolled RNN (Olah, 2015)." -%}</html>

Unfortunately, RNNs are influenced by exploding and vanishing gradients, causing the network weights to become incredibly large or small as the input sequence (document size) grows, preventing the model from learning and destabilising its behaviour.

LSTMs expand on the RNN architecture, mitigating shortfalls by enabling an extended memory. However, even with their more advanced capabilities, they are hard to train due to long gradient paths and unreliable when using Transfer Learning, a process adopted in Convolution Neural Networks (CNNs) that takes a pre-trained model and allows fine-tuning to specialise to a small dataset. Furthermore, LSTMs and RNNs accept input one item at a time, a requirement for effectively understanding the context of the input sequence, drastically increasing training time (Seattle Applied Deep Learning, 2019). It was clear that something new was needed.

For more information on RNNs and LSTMs, check out the visual and intuitive [blog post](https://colah.github.io/posts/2015-08-Understanding-LSTMs/) by Christopher Olah.

## The New: Transformers
In 2017, Vaswani and his team presented the Transformer architecture. Initially, it was intended as a replacement for LSTMs and RNNs, specifically designed to improve how sequence modelling and transduction problems are tackled. However, over the past few years, research has shown that they are beneficial for solving tasks across multiple disciplines (Hu et al., 2023; Dosovitskiy et al., 2021; Verma & Chafe, 2021). We highlight the transformer architecture in Figure 2.1.

<html>{%- include single_parts/image.html url="transformer-model.jpg" alt="Transformer architecture" label="Figure 2.1. The Transformer model architecture (Vaswani et al., 2017)." -%}</html>

Now I know what you are thinking, _"Wow, this looks complicated!"_ So let’s simplify it a bit. The architecture consists of two blocks: an encoder and a decoder (left and right, respectively). If you look closely, the blocks are nearly identical, with the addition of an extra multi-headed attention module in the decoder that is masked (discussed in the <u>Attention Mechanism</u> article).

At a high level, each block takes a set of embeddings encoded with positional information and is passed through one (or two) multi-headed attention modules. Residual connections (initial input passed into the module) are added to their output, which is normalised and passed through the subsequent Position-Wise Feed-Forward Network (PFN). The decoder then provides an output. We provide more information about the Encoder-Decoder process in this article.

Typically, new architectures would only add one or two additions/modifications. Vaswani et al. (2017) went above and beyond that by providing a robust model that replaced the old architecture with a new one and combined techniques already implemented in other ML disciplines. Furthermore, they supplied great hyperparameters, allowing the model to work "straight out of the box" without needing vast fine-tuning.

To get a sense of how revolutionary their work is, let’s look at the critical aspects of the architecture:
- They removed the need for recurrent components (required for memory in RNNs and LSTMs) and replaced them with the Attention Mechanism.
- They made the Attention Mechanism as straightforward as possible, utilising fundamental Neural Network concepts and basic matrix operations.
- They added positional encoding to embeddings for faster computations.
- Used residual connections between modules (component blocks) to eliminate the vanishing and exploding gradient problems.
- Added normalisation layers for additional gradient stability and reduced training time.
- Formulated the Attention Mechanism into heads, allowing multiple of them for parallelisation to further reduce training time.
- Provided a great benchmark of hyperparameters on Machine Translation tasks.

With all these aspects in mind, the architecture enables applicability for Transfer Learning that originally never existed for NLP problems (or at least not effectively)! Additionally, the encoder and decoder blocks can be decoupled from each other to solve different tasks without changing the core functionality. For example, ChatGPT and BERT (Radford et al., 2018; Devlin et al., 2019), two popular architectures, only have decoder or encoder layers, respectively. For one architecture to have this much capability is mind-blowing!

I imagine now you are thinking, _"Ryan, this is cool and all, but how does it work, and how do I implement it?"_ We’ll discuss that in the next section.

## Components
Below is a list of article links relating to the components of the Transformer architecture. We have split these into segments to provide a better digest of the constituents for both depth and practice. Select one of the links below to read about a corresponding component.
1. <u>Embeddings and Positional Encoding</u> - a detailed look at how embeddings are created and encoded in preparation for Transformer architectures (_Coming soon!_).
2. <u>Attention Mechanism</u> - a journey through the heart of the Transformer architecture, interpreting how it understands the context between tokens (_Coming soon!_).
3. <u>Position-Wise Feed-Forward Networks</u> - an analysis of the concept of ‘position-wise’, how it applies to neural networks and how it is used to benefit the Transformer architecture (_Coming soon!_). 
4. <u>Encoder-Decoder structure</u> - an investigation of the Transformer architecture as a whole, building an understanding of what they consist of and how they operate and tie together (_Coming soon!_).
5. <u>Residual Learning and Layer Normalisation</u> - an exploration of residual connections, their importance and how normalisation benefits Neural Networks (_Coming soon!_).

The articles are designed to act independently from one another but provide a means to paint a complete picture of how Transformers operate.

## References
Center for Humane Technology, 2023. _The A.I. Dilemma - March 9, 2023._ [online] YouTube. Available from: [https://www.youtube.com/watch?v=xoVJKj8lcNQ&t=853s](https://www.youtube.com/watch?v=xoVJKj8lcNQ&t=853s).

Devlin, J., Chang, M.-W., Lee, K., and Toutanova, K., 2019. _Bert: Pre-training of deep bidirectional Transformers for language understanding._ arXiv.org. Available from: [http://arxiv.org/abs/1810.04805](http://arxiv.org/abs/1810.04805).

Dosovitskiy, A., Beyer, L., Kolesnikov, A., Weissenborn, D., Zhai, X., Unterthiner, T., Dehghani, M., Minderer, M., Heigold, G., Gelly, S., Uszkoreit, J., and Houlsby, N., 2021. _An image is worth 16x16 words: Transformers for image recognition at scale._ arXiv.org. Available from: [https://arxiv.org/abs/2010.11929](https://arxiv.org/abs/2010.11929).

Hu, S., Shen, L., Zhang, Y., Chen, Y., and Tao, D., 2023. _On transforming reinforcement learning by transformer: The development trajectory._ arXiv.org. Available from: [https://arxiv.org/abs/2212.14164](https://arxiv.org/abs/2212.14164).

Olah, C., 2015. _Understanding LSTM Networks._ [online] Available from: [https://colah.github.io/posts/2015-08-Understanding-LSTMs/](https://colah.github.io/posts/2015-08-Understanding-LSTMs/).

Radford, A., Narasimhan, K., Salimans, T., and Sutskever, I., 2018. _Improving Language Understanding by Generative Pre-Training._ Available from: [https://s3-us-west-2.amazonaws.com/openai-assets/research-covers/language-unsupervised/language_understanding_paper.pdf](https://s3-us-west-2.amazonaws.com/openai-assets/research-covers/language-unsupervised/language_understanding_paper.pdf).

Seattle Applied Deep Learning, 2019. _LSTM is dead. long live transformers!_ [online] YouTube. Available from: [https://www.youtube.com/watch?v=S27pHKBEp30](https://www.youtube.com/watch?v=S27pHKBEp30).

Vaswani, A., Shazeer, N., Parmar, N., Uszkoreit, J., Jones, L., Gomez, A.N., Kaiser, L., and Polosukhin, I., 2017. _Attention is all you need._ arXiv.org. Available from: [https://arxiv.org/abs/1706.03762](https://arxiv.org/abs/1706.03762).

Verma, P., and Chafe, C., 2021. _A generative model for raw audio using Transformer Architectures._ arXiv.org. Available from: [https://arxiv.org/abs/2106.16036](https://arxiv.org/abs/2106.16036).