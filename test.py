import time


class Currency:
    def __init__(self, denominations):
        self.denominations = sorted(denominations, reverse=True)

    # number of ways to make change for amount
    # def num_ways(self, amount):
    #     final = []
    #     for idx, _ in enumerate(self.denominations):
    #         l = []
    #         for denominator in self.denominations[idx:]:
    #             while True:
    #                 l.append(denominator)
    #                 total = sum(l)
    #                 if total == amount:
    #                     print('List: ', l)
    #                     final.append(l)
    #                     # l.pop()
    #                     break
    #                 elif total > amount:
    #                     break
    #     print(final)
    #     return len(final)

    def _calc(self, d, tree, idx, amount):
        l = tree.copy()
        coin = d[idx]
        l.append(coin)
        total = sum(l)
        print(l, total)
        
        if total == amount:
            return 1
        elif total < amount:
            idx += 1
            if idx < len(d):
                count = self._calc(d, l, idx, amount)
                print('Counter: ', count)
        return 0
            

    # number of ways to make change for amount
    def num_ways(self, amount):
        l = []

        for idx in range(len(self.denominations)):
            counts = self._calc(self.denominations, l, idx, amount)

        print(l)

        return counts
    
    # minumum number of coins required to make change for amount
    def min_change(self, amount):
        count = 0
        for denomination in self.denominations:
            while amount != 0:
                if amount // denomination != 0:
                    amount -= denomination
                    count += 1
                else:
                    break
        return count

us_cents = Currency([100, 50, 25, 10, 5, 1])
# print(us_cents.num_ways(6))
print(us_cents.num_ways(10))
